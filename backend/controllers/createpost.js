import Post from "../models/post.js"
const createpost = (req, res) => {
    try {

        const { body, photo } = req.body;

        if (!photo || !body) {
            return res.status(401).send({
                success: false,
                message: "Please add all fields"
            })
        }

        const post = new Post({
            body,
            image: photo,
            postedby: req.user
        });
        post.save().then((result) => {
            return res.status(200).send({
                message: "Posted Sucessfully",
                success: true
            })
        }).catch((e) => {
            console.log(e);
            return res.status(400).send({
                message: "Not able to save the post",
                success: false
            })
        })
    }
    catch (e) {
        console.log(e);
        return res.status(401).send({
            message: "Not able to post"
        })
    }
}
export default createpost;