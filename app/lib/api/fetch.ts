const api_url = "/api/graphql";
// const api_url = 'https://etheadless.local/graphql/'

export async function fetchAPI(query: any, { variables }: any = {}) {
  const res = await fetch(api_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("WP QUERY FETCH" + json.errors);
  }
  return json.data;
}

export async function logUserInClient(user: {
  password: string;
  username: string;
}) {
  const query = `
  mutation logIn($login: String!, $password: String!) {
      loginWithCookies(input: {
          login: $login
          password: $password
      }) {
          status
      },
  }
  `;
  const variables = {
    login: user.username,
    password: user.password,
  };
  return fetch(api_url, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    // @ts-ignore
    // agent,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
}
export async function logUserInServer(user: {
  password: string;
  username: string;
}) {
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  const query = `
  mutation logIn($login: String!, $password: String!) {
      loginWithCookies(input: {
          login: $login
          password: $password
      }) {
          status
      },
  }
  `;
  const variables = {
    login: user.username,
    password: user.password,
  };
  return fetch(api_url, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    // @ts-ignore
    agent,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
}
export async function getViewerServer(cookie: string) {
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  const query = `
    query getUser {
      viewer {
          id
          databaseId
          firstName
          lastName
          email
          capabilities
      }
    }
  `;
  return fetch(api_url, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    // @ts-ignore
    agent,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    body: JSON.stringify({
      query,
    }),
  });
}
export async function getPreviewPostPageServer({
  previewType,
  id,
}: {
  previewType: string;
  id: string;
}) {
  console.log("getPreviewPostPageServer", previewType);
  console.log("getPreviewPostPageServer id", id);

  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  const variables = {
    id,
  };
  const queryPost = `
    query postById($id: ID!) {
        post(idType: DATABASE_ID, id: $id) {
            __typename
        author {
            node {
                avatar {
                    height
                    url
                    width
                }
                id
                name
                slug
                uri
            }
        }
        id
        categories {
            edges {
                node {
                    databaseId
                    id
                    name
                    slug
                }
            }
        }
        tags{
            edges{
                node{
                    name
                }
            }
        }
        content
        date
        excerpt
        featuredImage {
            node {
                altText
                caption
                sourceUrl
                srcSet
                sizes
                id
            }
        }
        modified
        databaseId
        title
        slug
        isSticky
        seo{
            title
            opengraphPublishedTime
            opengraphModifiedTime
            metaDesc
            readingTime
        }
        }
    }
  `;
  const queryPage = `
    query pageById($id: ID!) {
        page(idType: DATABASE_ID, id: $id) {
          author {
            node {
                avatar {
                    height
                    url
                    width
                }
                id
                name
                slug
                uri
            }
        }
        id
        content
        date
        featuredImage {
            node {
                altText
                caption
                sourceUrl
                srcSet
                sizes
                id
            }
        }
        title
        content
        seo{
            title
            opengraphPublishedTime
            opengraphModifiedTime
            metaDesc
            readingTime
        }
      }
    }
  `;
  return fetch(api_url, {
    method: "POST",
    credentials: "include",
    // mode: 'cors',
    // @ts-ignore
    agent,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: previewType === "blog" ? queryPost : queryPage,
      variables,
    }),
  });
}
export async function getViewerClientSide() {
  const query = `
    query getUser {
      viewer {
          id
          databaseId
          firstName
          lastName
          email
          capabilities
      }
    }
  `;
  return fetch(api_url, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    // @ts-ignore
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });
}
