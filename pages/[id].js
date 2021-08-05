import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const Post = () => {
  const [postData, setPostData] = useState({
    title: '',
    text: '',
    comments: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  // console.log(id);

  const fetchPost = () => {
    axios
      .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
      .then((response) => {
        let commentData = response.data.kids;
        // if (response.data.kids != null) {
        //   commentData = '';
        // }

        let titleData = response.data.title;
        let textData = response.data.text;
        setPostData((prevPostData) => {
          return { title: titleData, text: textData, comments: commentData };
        });
        console.log(response.data.text);
      })
      .catch((err) => {
        console.error(err);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  console.log(postData);
  return (
    <div>
      <p>Title: {postData.title}</p>
      <p>Text: {postData.text}</p>
      <p>Comments: {postData.comments}</p>
    </div>
  );
};

export default Post;
