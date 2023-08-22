import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import profile_pic from "../static/images/profile.jpg";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import MyConnections from "../components/shared/MyConnections";

//add salary (optional)
//description
//PostedBy
//PostedOn
//isExternal?
//externalLink

const Jobs = () => {

    const navigate = useNavigate();

    // checks if user is logged in, if not, redirects to login page
    React.useEffect(() => {
        if (localStorage.getItem("loggedIn") !== "1") {
        navigate("/login");
        }
    }, []);

    const [activeModalId, setActiveModalId] = useState(null)

    const handleOpenModal = (job) => {
        setActiveModalId(job._id);
    };
    const handleCloseModal = () => {
        setActiveModalId(null);
    };

    const [user, setUser] = useState([]);
    const skills = user && user?.skills;
    const [jobs, setJobs] = useState([]);


    const getJobs = async () => {
        axios.get("../api/user/jobPosts/getJobPosts")
            .then(res => {
                setJobs(res.data)
            }).catch(err => {
            console.log(err)
        })
    }

    useEffect (() => {
        getJobs();
    }, [])

    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', !!activeModalId);
    }, [activeModalId]);

    return (

        <div className="w-100">
            <Helmet>
                <meta charSet='utf-8'/>
                <title>Job Application</title>
            </Helmet>

            <div class="flex flex-col items-center mt-5">
                <div class="flex-auto w-full md:w-3/4 lg:w-10/12 lg:p-5">
                    <div className="flex lg:gap-8">
                        <div class="flex flex-items items-center hidden lg:block">
                            <div className="w-[15rem]">
                                <div className="card bg-base-100 shadow-xl p-5">
                                <figure className="px-10 pt-10">
                                    <img src={profile_pic} alt="Shoes" className="rounded-xl" />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title">Khalid</h2>
                                    <div className="side-user-info">
                                    <p>software eng</p>
                                    {/* <p>My Company Inc.</p> */}
                                    </div>
                                    <hr />
                                    <div className="side-user-info items-left">
                                    <p>
                                        <span className="font-semibold">
                                        {/* Skills: <br /> */}
                                        </span>
                                        {/* {user_skills && Object.keys(user_skills).map((skills_txt) => (
                                        <span>{user_skills[skills_txt]}</span>
                                    ))} */}
                                        
                                    </p>
                                    {/* {user_skills} */}
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full w-full lg:w-3/4 bg-white relative lg:rounded-t-xl">
                        
                            <div className="flex flex-col justify-between gap-3">
                                <h2 className="flex justify-center text-2xl font-bold md:text-3xl m-12">Recent Available Jobs</h2>
                                <div className="mb-4 flex gap-x-5 md:gap-x-10 justify-center">
                                    <form>
                                        <div className="flex">
                                            <label htmlFor="search-dropdown"
                                                    className="text-sm font-medium text-gray-900 sr-only dark:text-white">Your
                                                Email</label>
                                            <button id="dropdown-button" data-dropdown-toggle="dropdown"
                                                    className="flex-shrink-0 inline-flex items-center py-1.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                                                    type="button">All categories <svg aria-hidden="true"
                                                                                        className="w-4 h-4 ml-1"
                                                                                        fill="currentColor"
                                                                                        viewBox="0 0 20 20"
                                                                                        xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clip-rule="evenodd"></path>
                                            </svg></button>
                                            <div className="relative w-full">
                                                <input type="search" id="search-dropdown"
                                                        className="block p-1.5 w-full text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300"
                                                        placeholder="Search Jobs..."
                                                        required/>
                                                    <button type="submit"
                                                            className="absolute top-0 right-0 p-1.5 text-sm font-medium text-white bg-indigo-400 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        <svg aria-hidden="true" className="w-5 h-5" fill="none"
                                                                stroke="currentColor" viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                                        </svg>
                                                        <span className="sr-only">Search</span>
                                                    </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {jobs.slice(0).reverse().map((job)=> (
                                <div key={job._id} className=" items-center grid gap-5 my-2 md:grid-cols-2 lg:grid-cols-1 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 text-black max-w-screen-xl">
                                    <div onClick={() => handleOpenModal(job)} className="flex flex-col justify-between gap-3 px-6 py-6 border border-gray-200 lg:flex-row group hover:border-black rounded-xl">
                                        <div className="flex flex-col items-start flex-1 gap-5 lg:flex-row">
                                            <div className="w-20">
                                                <img className={"rounded-lg"} src={profile_pic} alt="Logo"/>
                                            </div>

                                            <div className="flex-1 items-initial lg:text-start">
                                                <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
                                                <div>
                                                    <span className="text-green-500">{job.company}</span>
                                                    <span className='pl-2 pr-2'>•</span>
                                                    <span className='jobs-salary'>{job.salary}</span>
                                                    
                                                    <span className='jobs-location'>{job.location}</span>
                                                    <div className='jobs-description pt-5'>
                                                        {job.description.substring(0, 50)} ...
                                                    </div>
                                                </div>
                                                <div className='pt-5 text-right'>
                                                    <a className="px-6 py-2 text-white font-semibold duration-150 transform border border-white rounded-full hover:bg-blue-800 bg-indigo-400 group-hover:border-transparent" href="/#">
                                                        Apply
                                                    </a>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>


                                    {/* Modal */}
                                            {activeModalId === job._id && (
                                        <>
                                            {/* Modal container */}
                                            <div className="fixed inset-0 flex items-center justify-center z-10">
                                                {/* Backdrop */}
                                                <div className="fixed inset-0 bg-black opacity-50 pointer-events-auto"></div>

                                                {/* Modal content */}
                                                <div className="flex flex-col lg:h-3/4 lg:w-1/2 sm:w- bg-white max-w-lg lg:rounded-lg relative h-full ">
                                                    <div className={"flex flex-col h-full pr-6 pl-6 pt-6 justify-between"}>
                                                            <label onClick={handleCloseModal} className="btn btn-sm btn-circle absolute right-2 top-2">
                                                                ✕
                                                            </label>
                                                        <div>
                                                            <img
                                                                src={profile_pic}
                                                                className="mt-5 flex w-1/3 mr-auto mb-8 ml-auto rounded-full shadow-xl"
                                                            />
                                                            <p className="text-lg font-semibold">{job.title}</p>
                                                            <p className="text-lg text-green-500 font-semibold mb-2">{job.company}</p>
                                                        </div>
                                                            <div className="flex flex-col overflow-auto">
                                                                <p className="text-left mt-8 text-2xl italic font-semibold text-lg">Description:</p>
                                                                <p className="text-left mt-3 text-base leading-relaxed text-black-200">
                                                                    {job.description}
                                                                </p>
                                                                <p className="text-left mt-8 text-2xl italic font-semibold text-lg">Salary:</p>
                                                                <p className="text-left mt-3 text-base leading-relaxed text-black-200 mb-2">
                                                                    {job.salary}
                                                                </p>
                                                        </div>
                                                        <div className="flex items-center justify-center w-full py-5">
                                                            <a
                                                                className="m-auto text-center w-40 items-center justify-center pt-4 pb-4 font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                            >
                                                                Apply Now
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                </div>
                            ))}
                        </div>
                        <MyConnections />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs