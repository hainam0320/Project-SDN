import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        fetch("http://localhost:5000/api/articles", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setArticles(data))
            .catch((err) => console.error("Error fetching articles:", err));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="container mx-auto px-4 relative">
            <div className="bg-green-500 text-black py-10 text-center flex justify-center items-center px-8 relative">
                <div>
                    <h1 className="text-4xl font-bold">conduit</h1>
                    <p className="text-lg">A place to share your knowledge.</p>
                </div>           
            </div>
            <button onClick={handleLogout} className="absolute top-0 right-0 m-4 bg-red-500 text-black px-4 py-2 rounded">Logout</button>

            <div className="flex mt-8">
                <div className="w-2/3">
                    <h1 className="text-2xl font-bold mb-4">Global Feed</h1>
                    {articles.length === 0 ? (
                        <p>Loading...</p>
                    ) : (
                        articles.map((article, index) => (
                            <div key={index} className="border p-4 mb-4 rounded-lg shadow">
                                <h2 className="text-xl font-semibold">{article.title}</h2>
                                <p>{article.description}</p>
                                <p className="text-sm text-gray-500">By {article.author.username} on {new Date(article.createdAt).toLocaleDateString()}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
