import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
      getAllPosts: [Post!]!
      getAllPostsPaginated(page: Int, limit: Int): PostPaginator!
      getLoggedInUsersPosts(page: Int, limit: Int): PostPaginator! @isAuth
      getPostId(id: ID!): Post!
    }

    extend type Mutation {
        createNewPost(newPost: PostInput!) : Post! @isAuth
        editPost(updatedPost: PostInput, id:ID!) : Post! @isAuth
        deletePost(id: ID!) : PostNotification! @isAuth
    }

    input PostInput{
        title: String!
        content: String!
        featuredImage: String
    }

    type Post {
        id: String!
        title: String!
        content: String!
        featuredImage: String
        createdAt: String
        updatedAt: String
        author: User!
    }

    type PostPaginator {
        items: [Post!]!
        paginator: PLabels
    }

    type PLabels {
        itemCount: Int!,
        perPage: Int!,
        pageCount: Int!,
        currentPage: Int!,
        slNo: Int!,
        hasPrevPage: Boolean!,
        hasNextPage: Boolean!,
        prev: Int,
        next: Int
    }


    type PostNotification{
        id: ID!
        message : String!
        success : Boolean
    }
    
`

