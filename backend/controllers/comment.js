import Post from "../models/post.js";

const comment = async (req, res) => {
  try {
    const newComment = {
      comment: req.body.text,
      postedby: req.user._id
    };

    const result = await Post.findByIdAndUpdate(
      req.body.id,
      { $push: { comments: newComment } },
      { new: true }
    )     
      .populate("postedby", "_id name Photo")
      .populate("comments.postedby", "_id name")

    if (result) {
      return res.json(result);
    } else {
      return res.json({
        success: false,
        message: "Not able to add comment 1"
      });
    }
  } catch (e) {
    console.log(e);
    return res.json({
      success: false,
      message: "Not able to add comment"
    });
  }
};

export default comment;
