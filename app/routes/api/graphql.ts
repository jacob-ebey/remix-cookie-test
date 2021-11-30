import type { ActionFunction } from "remix";

const api_url = "https://etheadless.wpengine.com/graphql/";
export let action: ActionFunction = ({ request }) => {
  return fetch(api_url, {
    method: "post",
    body: request.body,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
