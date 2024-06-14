const prisma = require("../prisma/index")

// create a new post

exports.createPost = async(req,res,next) => {
    try{
        const {slug,title, body,authorId}= req.body;

        // validation on you
        const result = await prisma.post.create({
            data: {
                slug,
                title, 
                body,
                author: {connect: {id: authorId}}
            }
        })

        return res.status(200).json({
            data: data,
            message: "Post successfully created",
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}

// update a post

exports.updatePost = async(req,res,next) => {
    const {id} = req.params;
    const {title,body} = req.body;

    try{
        const result = await prisma.post.update({
            where: {id: id},
            data: {
                title: title,
                body: body,
            }
        });

        return res.status(200).json({
            data: result,
            message: "successfully updated",
        });
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}

// delete a post

exports.deletePost = async(req,res,next) => {
    try{
        const {id} = req.params;  
        const result = await prisma.post.delete({
            where: {id:id},
        })

        return res.status(200).json({
            success:true,
            message: "Post deleted successfully",
        })        

    } catch (error) {
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}

// get all the posts

exports.getPosts = async(req,res,next) => {
    try{
       
        const data = await prisma.post.findMany();

        return res.status(200).json({
            success:true,
            message: data,
        })        

    } catch (error) {
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}


