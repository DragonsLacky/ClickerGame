import { ApolloError } from "apollo-server-express";

const labels = {
    totalDocs: 'itemCount',
    docs: 'items',
    limit: 'perPage',
    page: 'currentPage',
    nextPage: 'next',
    prevPage: 'prev',
    totalPages: 'pageCount',
    pagingCounter: 'slNo',
    meta: 'paginator'
};


export default {
    Query: {

        getAllPosts: async (_, {} , {Post}) => {
            let posts = await Post.find().populate('author');
            return posts;
        },

        getPostId:  async (_,{ id }, { Post }) => {
            try {
                let result = await Post.findById(id);
                if(!result){
                    throw new ApolloError('Cannot find post with the specified id');
                }
                await result.populate('author').execPopulate();
            } catch(err) {
                throw new ApolloError(err.message,400);
            }

            return result;
        },

        getAllPostsPaginated: async (_, { page, limit  }, { Post }) => {
            const options = {
                page: page || 1,
                limit: limit || 10,
                sort: {createdAt: -1},
                populate: 'author',
                customLabels: labels
            };
            let posts = await Post.paginate({}, options);
            return posts;            
        },

        getLoggedInUsersPosts: async (_, { page, limit }, { Post, user}) => {
            const options = {
                page: page || 1,
                limit: limit || 10,
                sort: {createdAt: -1},
                populate: 'author',
                customLabels: labels
            };
            let posts = await Post.paginate({author : user.id}, options);
            return posts; 
        }
    },
    Mutation: {

        createNewPost: async (_, {newPost}, {Post, user}) => {
            let result = await Post.create({...newPost, author: user._id});
            await result.populate('author').execPopulate();
            return result;
        },

        editPost: async (_, {id,updatedPost}, { Post, user }) => {
            try{
                let result = await Post.findOneAndUpdate({_id: id, author: user.id}, { ...updatedPost }, {new : true});
                if(!result){
                    throw new ApolloError("Can not edit post.");
                }
                await result.populate('author').execPopulate();
                return result;
            } catch(err) {
                throw new ApolloError(err.message,400);
            }
            
        },

        deletePost: async (_, { id }, { Post, user }) => {
            try {
                let result = await Post.findOneAndDelete({_id:id, author: user._id});
                if(!result){
                    throw new ApolloError("Can not delete post.");
                }
                return {
                    id: result.id,
                    message: "The item has been deleted.",
                    success: true,
                }
            } catch(err) {
                throw new ApolloError(err.message, 400);
            }
        }, 
    }
}



