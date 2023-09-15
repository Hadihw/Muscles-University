import React from 'react';

const RegisterForm = ({
				   firstName,
				   setFirstName,
				   lastName,
				   setLastName,
				   email,
				   setEmail,
				   password,
				   setPassword,
				   confirmPassword,
				   setConfirmPassword,

			   }) => {
	return (
		<>
			<div className="lg:w-1/3 m-auto">
				<div>
					<label htmlFor="firstName" className="sr-only">
						First Name
					</label>
					<input
						id="firstName"
						name="firstName"
						type="text"
						value={firstName}
						required
						className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-dark focus:outline-none focus:ring-dark sm:text-sm"
						placeholder="First Name"
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="lastName" className="sr-only">
						Last Name
					</label>
					<input
						id="lastName"
						name="lastName"
						type="text"
						required
						value={lastName}
						className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-dark focus:outline-none focus:ring-dark sm:text-sm"
						placeholder="Last Name"
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="email-address" className="sr-only">
						Email address
					</label>
					<input
						id="email-address"
						name="email"
						type="email"
						autoComplete="email"
						value={email}
						required
						className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-dark focus:outline-none focus:ring-dark sm:text-sm"
						placeholder="Email address"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="password" className="sr-only">
						Password
					</label>
					<input
						id="password"
						name="password"
						type="password"
						value={password}
						autoComplete="current-password"
						required
						className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-dark focus:outline-none focus:ring-dark sm:text-sm"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="confirmPassword" className="sr-only">
						Confirm Password
					</label>
					<input
						id="confirmPassword"
						name="confirmPassword"
						value={confirmPassword}
						type="password"
						autoComplete="current-password"
						required
						className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-dark focus:outline-none focus:ring-dark sm:text-sm"
						placeholder="Confirm Password"
						onChange={(e) => setConfirmPassword(e.target.value)}
						onPaste={(e) => e.preventDefault()}
					/>
				</div>
			</div>
		</>
	);
};
export default RegisterForm;
