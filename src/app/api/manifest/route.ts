
import { createManifestHandler } from "@saleor/app-sdk/handlers/next";
import { AppManifest } from "@saleor/app-sdk/types";

import packageJson from "../../../../package.json";
import { orderCreatedWebhook } from "../webhooks/order-created";
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * App SDK helps with the valid Saleor App Manifest creation. Read more:
 * https://github.com/saleor/saleor-app-sdk/blob/main/docs/api-handlers.md#manifest-handler-factory
 */
const handler = createManifestHandler({
  async manifestFactory ({ appBaseUrl }) {
    /**
     * Allow to overwrite default app base url, to enable Docker support.
     *
     * See docs: TODO
     */
    if (appBaseUrl === 'http://undefined') {
      appBaseUrl = "https://879b-99-228-175-229.ngrok-free.app";
    }

    const manifest: AppManifest = {
      name: 'Saleor App Template',
      tokenTargetUrl: `${appBaseUrl}/api/register`,
      appUrl: appBaseUrl,
      /**
       * Set permissions for app if needed
       * https://docs.saleor.io/docs/3.x/developer/permissions
       */
      permissions: [
        /**
         * Add permission to allow "ORDER_CREATED" webhook registration.
         *
         * This can be removed
         */
        "MANAGE_ORDERS",
        "MANAGE_CHECKOUTS"
      ],
      id: "saleor.app",
      version: packageJson.version,
      /**
       * Configure webhooks here. They will be created in Saleor during installation
       * Read more
       * https://docs.saleor.io/docs/3.x/developer/api-reference/webhooks/objects/webhook
       *
       * Easiest way to create webhook is to use app-sdk
       * https://github.com/saleor/saleor-app-sdk/blob/main/docs/saleor-webhook.md
       */
      webhooks: [],
      /**
       * Optionally, extend Dashboard with custom UIs
       * https://docs.saleor.io/docs/3.x/developer/extending/apps/extending-dashboard-with-apps
       */
      extensions: [],
    };
    console.log(manifest);
    return manifest;
  },
});

export async function GET (request: NextApiRequest, response: NextApiResponse) {
  console.log("res", response);
  console.log("req", request);
  return handler(request, response);
}
