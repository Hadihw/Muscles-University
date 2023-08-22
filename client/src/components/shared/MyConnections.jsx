import React from 'react'
import { RiSendPlaneFill } from 'react-icons/ri'
import profile_pic from '../../static/images/profile.jpg'

export default function MyConnections() {
	return (
		<div class="w-1/4 hidden lg:block bg-white p-5 rounded-t-xl">
			<div className='mb-5'>
				<p className='text-lg font-semibold'>
					My Connections
				</p>
			</div>
			<div className="flex justify-left mt-2 mb-3">
				<div className="flex items-start">
					<div className='avatar'>
						<div className="w-12 rounded-full">
							<img src={profile_pic} />
						</div>
					</div>
					<div className="flex flex-col pl-5">
						<p className="lg:text-md font-semibold">Ayeshah</p>
						<span className="text-sm">Software Engineer</span>
						<button className="whiteBtn btn btn-sm bg-sky-400 font-light mt-3">
							<RiSendPlaneFill /> &nbsp; Message
						</button>
					</div>
				</div>
			</div>
			<hr />

			<div className="flex justify-left mt-2 mb-3">
				<div className="flex items-start">
					<div className='avatar'>
						<div className="w-12 rounded-full">
							<img src={profile_pic} />
						</div>
					</div>
					<div className="flex flex-col pl-5">
						<p className="lg:text-md font-semibold">Mohamad</p>
						<span className="text-sm">Software Engineer</span>
						<button className="whiteBtn btn btn-sm bg-sky-400 font-light mt-3">
							<RiSendPlaneFill /> &nbsp; Message
						</button>
					</div>
				</div>
			</div>
			<hr />

			<div className="flex justify-left mt-2 mb-3">
				<div className="flex items-start">
					<div className='avatar'>
						<div className="w-12 rounded-full">
							<img src={profile_pic} />
						</div>
					</div>
					<div className="flex flex-col pl-5">
						<p className="lg:text-md font-semibold">Nadine</p>
						<span className="text-sm">Software Engineer</span>
						<button className="whiteBtn btn btn-sm bg-sky-400 font-light mt-3">
							<RiSendPlaneFill /> &nbsp; Message
						</button>
					</div>
				</div>
			</div>
			<hr />

			<div className="flex justify-left mt-2 mb-3">
				<div className="flex items-start">
					<div className='avatar'>
						<div className="w-12 rounded-full">
							<img src={profile_pic} />
						</div>
					</div>
					<div className="flex flex-col pl-5">
						<p className="lg:text-md font-semibold">Saad</p>
						<span className="text-sm">Software Engineer</span>
						<button className="whiteBtn btn btn-sm bg-sky-400 font-light mt-3">
							<RiSendPlaneFill /> &nbsp; Message
						</button>
					</div>
				</div>
			</div>
			<hr />

			<div className="flex justify-left mt-2 mb-3">
				<div className="flex items-start">
					<div className='avatar'>
						<div className="w-12 rounded-full">
							<img src={profile_pic} />
						</div>
					</div>
					<div className="flex flex-col pl-5">
						<p className="lg:text-md font-semibold">Jonnathan</p>
						<span className="text-sm">Software Engineer</span>
						<button className="whiteBtn btn btn-sm bg-sky-400 font-light mt-3">
							<RiSendPlaneFill /> &nbsp; Message
						</button>
					</div>
				</div>
			</div>
			<hr />

			<div className="flex justify-left mt-2 mb-3">
				<div className="flex items-start">
					<div className='avatar'>
						<div className="w-12 rounded-full">
							<img src={profile_pic} />
						</div>
					</div>
					<div className="flex flex-col pl-5">
						<p className="lg:text-md font-semibold">Hadi</p>
						<span className="text-sm">Software Engineer</span>
						<button className="whiteBtn btn btn-sm bg-sky-400 font-light mt-3">
							<RiSendPlaneFill /> &nbsp; Message
						</button>
					</div>
				</div>
			</div>
			<hr />

			<div className="flex justify-left mt-2 mb-3">
				<div className="flex items-start">
					<div className='avatar'>
						<div className="w-12 rounded-full">
							<img src={profile_pic} />
						</div>
					</div>
					<div className="flex flex-col pl-5">
						<p className="lg:text-md font-semibold">Daria</p>
						<span className="text-sm">Software Engineer</span>
						<button className="whiteBtn btn btn-sm bg-sky-400 font-light mt-3">
							<RiSendPlaneFill /> &nbsp; Message
						</button>
					</div>
				</div>
			</div>
			<hr />

			<div className="flex justify-left mt-2 mb-3">
				<div className="flex items-start">
					<div className='avatar'>
						<div className="w-12 rounded-full">
							<img src={profile_pic} />
						</div>
					</div>
					<div className="flex flex-col pl-5">
						<p className="lg:text-md font-semibold">Jean</p>
						<span className="text-sm">Software Engineer</span>
						<button className="whiteBtn btn btn-sm bg-sky-400 font-light mt-3">
							<RiSendPlaneFill /> &nbsp; Message
						</button>
					</div>
				</div>
			</div>
			<hr />
		</div>
	)
}