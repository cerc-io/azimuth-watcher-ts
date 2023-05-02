//
// Copyright 2023 Vulcanize, Inc.
//

import { createYoga } from 'graphql-yoga';
import waitOn from 'wait-on';

import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { stitchSchemas } from '@graphql-tools/stitch';
import { RenameRootFields, schemaFromExecutor } from '@graphql-tools/wrap';

const WATCHERS = [
  {
    prefix: 'azimuth',
    port: 3001
  },
  {
    prefix: 'censures',
    port: 3002
  },
  {
    prefix: 'claims',
    port: 3003
  },
  {
    prefix: 'conditionalStarRelease',
    port: 3004
  },
  {
    prefix: 'delegatedSending',
    port: 3005
  },
  {
    prefix: 'ecliptic',
    port: 3006
  },
  {
    prefix: 'linearStarRelease',
    port: 3007
  },
  {
    prefix: 'polls',
    port: 3008
  }
];

async function makeGatewaySchema() {
  await waitOn({ resources: WATCHERS.map(watcher => `tcp:${watcher.port}`) });

  const subSchemaPromises = WATCHERS.map(async watcher => {
    // Make remote executors:
    // these are simple functions that query a remote GraphQL API for JSON.
    const remoteExecutor = buildHTTPExecutor({
      endpoint: `http://localhost:${watcher.port}/graphql`
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
