//
// Copyright 2023 Vulcanize, Inc.
//

import { createYoga } from 'graphql-yoga';
import isReachable from 'is-reachable';

import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { stitchSchemas } from '@graphql-tools/stitch';
import { RenameRootFields, schemaFromExecutor } from '@graphql-tools/wrap';

import watchers from './watchers.json'

async function makeGatewaySchema() {
  await isReachable(watchers.map(watcher => watcher.endpoint));

  const subSchemaPromises = watchers.map(async watcher => {
    // Make remote executors:
    // these are simple functions that query a remote GraphQL API for JSON.
    const remoteExecutor = buildHTTPExecutor({
      endpoint: watcher.endpoint
    })

    return {
      // Introspect a remote schema. Caveats:
      // - Remote server must enable introspection.
      // - Custom directives are not included in introspection.
      schema: await schemaFromExecutor(remoteExecutor),
      executor: remoteExecutor,
      transforms: [
        new RenameRootFields(
          (op, name) => `${watcher.prefix}${name.charAt(0).toUpperCase()}${name.slice(1)}`,
        )
      ]
    }
  })

  return stitchSchemas({
    subschemas: await Promise.all(subSchemaPromises),
  });
}

export const gatewayApp = createYoga({
  schema: makeGatewaySchema(),
  maskedErrors: false,
  graphiql: {
    title: 'Azimuth watchers'
  },
});
