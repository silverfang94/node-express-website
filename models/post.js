const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');

const schema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    body: { type: String },
    url: {
      type: String
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['published', 'draft'],
      required: true,
      default: 'published'
    },
    commentCount: {
      type: Number,
      default: 0
    },
    uploads: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Upload'
      }
    ]
  },
  { timestamps: true }
);

schema.statics = {
  incCommentCount(postId) {
    return this.findByIdAndUpdate(
      postId,
      { $inc: { commentCount: 1 } },
      { new: true }
    );
  }
};

schema.plugin(
  URLSlugs('title', {
    field: 'url'
  })
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Post', schema);
