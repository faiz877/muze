import { gql } from "@apollo/client"

export const GET_POSTS = gql`
  query GetPosts($page: Int!, $limit: Int!) {
    posts(page: $page, limit: $limit) {
      __typename
      id
      author
      username
      content
      likes
      comments
      reposts
      views
      timestamp
      imageUrl
      avatarUrl
      isReply
      parentPostId
    }
  }
`

export const LIKE_POST = gql`
  mutation LikePost($id: ID!) {
    likePost(id: $id) {
      __typename
      id
      likes
    }
  }
`

export const NEW_POST_SUBSCRIPTION = gql`
  subscription {
    newPost {
      __typename
      id
      author
      username
      content
      likes
      comments
      reposts
      views
      timestamp
      imageUrl
      avatarUrl
      isReply
      parentPostId
    }
  }
`