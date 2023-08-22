// feed controller
// Author: Jonathan Haddad - Saad Hanna
// Date created: Mar 2, 2023
// Description: This file contains the methods for handling the various feed related HTTP requests. These include posting a new feed, getting all feeds based on filters and pagination, getting a single feed by id, deleting a feed, updating a feed, adding a like to a feed, adding a comment to a feed, and getting a personal feed for a user. The controller uses the feedsM and accountM models to interact with the database. The getAllPosts method performs advanced filtering using the $gte, $gt, $lte, and $lt operators to match posts that meet the specific criteria. It then adds sorting based on the sort query parameter, and pagination based on the page and limit query parameters. Overall, this controller allows users to perform various actions on feeds, including creating, updating, and deleting feeds, and interacting with feeds through likes and comments.



const feedsM = require("../models/feedsM.js");
const asyncHandler = require("express-async-handler");
const accountM = require("../models/accountM.js");

// add post function working:
// @body    title, poster, postedOn, description, likes, comments, status, tags
// @return  created post

const postFeed = asyncHandler(async (req, res) => {
  const {
    title,
    poster,
    name,
    postedOn,
    description,
    likes,
    comments,
    status,
    tags,
  } = req.body;
  const feed = new feedsM({
    title,
    poster,
    name,
    postedOn,
    description,
    likes,
    comments,
    status,
    tags,
  });
  const createdFeed = await feed.save();
  res.status(201).json(createdFeed);
});

// get all posts function working:

// First, the function parses the query object from the request query parameters and removes any excluded fields. Then, it performs advanced filtering using the $gte, $gt, $lte, and $lt operators to match posts that meet the specific criteria.

// The function then adds sorting to the query based on the sort query parameter, which can specify one or more fields to sort by, and the direction of the sort. If no sort parameter is provided, the function defaults to sorting the posts by their creation date in descending order.

// Finally, the function adds pagination to the query based on the page and limit query parameters. The page parameter determines which page of results to retrieve, while the limit parameter specifies how many posts to retrieve per page. The function then skips over the appropriate number of posts and limits the results to the specified number.

// Once the query is fully constructed, the function executes it and returns a JSON response with the matching posts, along with metadata such as the number of results and any other relevant data.

// Overall, this function allows users to retrieve specific subsets of posts based on their filtering criteria, sort them according to different fields and directions, and paginate the results to improve performance and user experience.

// example of how to use the function:

// axios
//   .get(`${BASE_URL}/posts`, {
//     params: {
//       // Filter posts by likes greater than or equal to 10
//       likes_gte: 10,

//       // Sort posts by creation date in descending order and then by likes in ascending order
//       sort: "-createdAt likes",

//       // Retrieve posts from page 2, with 10 posts per page
//       page: 2,
//       limit: 10,
//     },
//   })
//   .then((response) => {
//     // Handle successful response
//     console.log(response.data);
//   })
//   .catch((error) => {
//     // Handle error
//     console.error(error);
//   });

// gte: greater than or equal to
// gt: greater than
// lte: less than or equal to
// lt: less than

// @return  all posts
// @desc    Get all posts
// @params  page, sort, limit, fields
// @example /posts?page=2&sort=-createdAt likes&limit=10
// @example /posts?page=2&sort=-createdAt likes&limit=10&fields=title,description

const getAllPosts = asyncHandler(async (req, res, next) => {
  try {
    // Build query object
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = feedsM.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-postedOn");
    }

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    // Execute query
    const posts = await query;

    // Send response
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

// pass the id of the post you want to get in the url

const getFeedById = asyncHandler(async (req, res) => {
  const feed = await feedsM.findById(req.query.id);
  if (feed) {
    res.json(feed);
  } else {
    res.status(404);
    throw new Error("Feed not found");
  }
});

// pass the id of the post you want to delete in the url
// @return  deleted post
// @desc    Delete a post
// @example /posts/{id}
const deleteFeed = asyncHandler(async (req, res) => {
  const feed = await feedsM.findById(req.params.id);
  if (feed) {
    await feed.remove();
    res.json({ message: "Feed removed" });
  } else {
    res.status(404);
    throw new Error("Feed not found");
  }
});

// @body    title, poster, postedOn, description, likes, comments, status, tags
// @return  updated post
// @desc    Update a post
// @example /posts/{id}

const updateFeed = asyncHandler(async (req, res) => {
  const {
    title,
    poster,
    postedOn,
    description,
    likes,
    comments,
    status,
    tags,
  } = req.body;
  const feed = await feedsM.findById(req.params.id);
  if (feed) {
    feed.title = title;
    feed.poster = poster;
    feed.postedOn = postedOn;
    feed.description = description;
    feed.likes = likes;
    feed.comments = comments;
    feed.status = status;
    feed.tags = tags;
    const updatedFeed = await feed.save();
    res.json(updatedFeed);
  } else {
    res.status(404);
    throw new Error("Feed not found");
  }
});

// id: post id, like: user id
// if you want to just pass the number of likes you can pass 1,2,3 in the like option
// if you want to pass the user id you can pass the user id in the like option and then count the lentgh of the array to get the total number of likes
// then you can get tthe user based on the id from front-end and then get the name of the user and display it in the frontend if you like

// @body    id, like
// @return  updated post
// @desc    Add a like to a post
// @example /posts/like

const addLike = asyncHandler(async (req, res) => {
  const { id, like } = req.body;
  const feed = await feedsM.findById(id);
  if (feed) {
    feed.likes.push(like);
    const updatedFeed = await feed.save();
    res.json(updatedFeed);
  } else {
    res.status(404);
    throw new Error("Feed not found");
  }
});

// comments is ant array fo objects with two properties: userId ( who commented) and comment (the comment content)
// you can pass the user id and the comment content from the front end and then get the user name from the user id and display it in the frontend
// you need to pass the post id and the comment object ( userId and comment string ) in the body of the request

// @body    id, comment
// @return  updated post
// @desc    Add a comment to a post
// @example /posts/comment

const addComment = asyncHandler(async (req, res) => {
  const { id, comment } = req.body;
  const feed = await feedsM.findById(id);
  if (feed) {
    feed.comments.push(comment);
    const updatedFeed = await feed.save();
    res.json(updatedFeed);
  } else {
    res.status(404);
    throw new Error("Feed not found");
  }
});

// @body    id
// @return  list of posts from the connections of the user
// @desc    Get the personal feed of a user
// @example /posts/personal/{id}

const getPersonalFeed = asyncHandler(async (req, res) => {
  const id = req.query.id; // user id
  const feed = [];
  try {
    const user = await accountM.findById(id);
    for (let i = 0; i < user.connections.length; i++) {
      const posts = await feedsM.find({ poster: user.connections[i] });
      feed.push(...posts);
    }
    res.status(200).json(feed);
  } catch (err) {
    console.log(err);
  }
});

module.exports = {
  postFeed,
  getAllPosts,
  getFeedById,
  deleteFeed,
  updateFeed,
  addLike,
  addComment,
  getPersonalFeed,
};
