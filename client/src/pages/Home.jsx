import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-6 p-28 px-3 max-w-5xl mx-auto">
          <h1 className="text-2xl font-semibold lg:text-6xl">
            Hi, I'am Midhun <br /> Full Stack Dev
          </h1>
          <p className="text-gray-500 text-xs border-l-[3px] border-l-solid border-l-gray-600 pl-2 sm:text-sm">
            Here you'll find a variety of articles and tutorials on topics such
            as web development,
            <br className="hidden md:block" /> software engineering, and
            programming languages.
          </p>
          <Link
            to="/search"
            className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
          >
            View all posts
          </Link>
        </div>
        <div className="max-w-5xl mx-auto hidden md:block">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mern-blog-1af0c.appspot.com/o/learn-coding%201.png?alt=media&token=16efec77-2bc7-4225-bf8f-bf86ca615997"
            className="h-[170px] w-auto lg:h-[300px]"
          />
        </div>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
