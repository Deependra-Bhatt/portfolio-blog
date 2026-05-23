interface ValidateBlogInput {
  title?: string;
  excerpt?: string;
  content?: string;
  tags?: string[];
}

export function validateBlog(data: ValidateBlogInput) {
  const { title, excerpt, content, tags } = data;

  if (!title || title.trim().length < 5) {
    return "Title must be at least 5 characters";
  }

  if (!excerpt || excerpt.trim().length < 10) {
    return "Excerpt must be at least 10 characters";
  }

  if (!content || content.trim().length < 50) {
    return "Content must be at least 50 characters";
  }

  if (!Array.isArray(tags)) {
    return "Tags must be an array";
  }

  return null;
}
