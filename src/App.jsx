import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function App() {
	const [koders, setKoders] = useState([]);
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitted },
		reset,
	} = useForm();

	function removeKoder(idx) {
		const kodersFiltered = koders.filter((koder, i) => i !== idx);
		setKoders(kodersFiltered);
	}

	function onSubmit(data) {
		console.log(data);

		setKoders([
			...koders,
			{ name: data.name, lastName: data.lastName, email: data.email },
		]);

		reset();
	}
	return (
		<main className="flex min-h-screen bg-[#161513] text-white w-full">
			<div className="grid grid-cols-2 h-full w-full">
				<div className="m-4 pt-5">
					<div className="rounded-md bg-emerald-300 p-4 pt-0 shadow-lg">
						<header className="flex h-16 items-center justify-between font-bold text-emerald-950">
							<span>Add Koder</span>
						</header>
						<form
							className="grid gap-3"
							onSubmit={handleSubmit(onSubmit)}>
							<input
								className="h-10 rounded-sm bg-emerald-100/50 px-2 text-emerald-950 placeholder:text-emerald-600/80 focus:outline-none focus:ring focus:ring-emerald-400"
								type="text"
								required
								placeholder="Enter your Name"
								{...register('name', {
									required: {
										value: true,
										message: 'Name is required',
									},
									minLength: {
										value: 3,
										message:
											'Name must have at least 3 characters',
									},
									maxLength: {
										value: 30,
										message:
											'Name must have a maximum of 30 characters',
									},
								})}
							/>

							{errors.name && (
								<span className="text-red-500 text-sm">
									{errors.name?.message}
								</span>
							)}

							<input
								className="h-10 rounded-sm bg-emerald-100/50 px-2 text-emerald-950 placeholder:text-emerald-600/80 focus:outline-none focus:ring focus:ring-emerald-400"
								type="text"
								required
								placeholder="Enter your Last Name"
								{...register('lastName', {
									required: {
										value: true,
										message: 'Last Name is required',
									},
									minLength: {
										value: 3,
										message:
											'Last Name must have at least 3 characters',
									},
									maxLength: {
										value: 30,
										message:
											'Last Name must have a maximum of 30 characters',
									},
								})}
							/>

							{errors.lastName && (
								<span className="text-red-500 text-sm">
									{errors.lastName?.message}
								</span>
							)}

							<input
								className="h-10 rounded-sm bg-emerald-100/50 px-2 text-emerald-950 placeholder:text-emerald-600/80 focus:outline-none focus:ring focus:ring-emerald-400"
								type="text"
								required
								placeholder="Enter your Email"
								{...register('email', {
									required: {
										value: true,
										message: 'Email is required',
									},
									minLength: {
										value: 6,
										message:
											'Email must have at least 6 characters',
									},
									maxLength: {
										value: 50,
										message:
											'Email must have a maximum of 50 characters',
									},
									pattern: {
										value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
										message: 'Invalid email format',
									},
								})}
							/>

							{errors.email && (
								<span className="text-red-500 text-sm">
									{errors.email?.message}
								</span>
							)}

							<div className="flex justify-end">
								<button
									className="flex h-10 items-center justify-between rounded-lg bg-emerald-700 px-2 text-emerald-100 transition-colors duration-300 hover:bg-emerald-800 focus:outline-none focus:ring focus:ring-emerald-400 disabled:bg-stone-400"
									type="submit"
									disabled={isSubmitted ? !isValid : false}>
									<span>Add</span>
									<span>
										<svg
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="h-6 w-6">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M8.25 4.5l7.5 7.5-7.5 7.5"
											/>
										</svg>
									</span>
								</button>
							</div>
						</form>
					</div>
				</div>
				<div className="m-4 pt-5">
					{koders.length > 0 ? (
						<div className="rounded-md bg-emerald-300 p-4 pt-0 shadow-lg">
							<header className="flex h-16 items-center justify-between font-bold text-emerald-950">
								<span>Koders List</span>
							</header>
							<ul className="mt-4">
								{koders.map((koder, idx) => (
									<li
										key={idx}
										className="flex items-center justify-between h-10">
										<span>
											{koder.name} {koder.lastName} -{' '}
											{koder.email}
										</span>
										<button
											className={clsx(
												'flex h-8 items-center justify-between rounded-lg bg-emerald-700 px-2 text-emerald-100 transition-colors duration-300 hover:bg-emerald-800 focus:outline-none focus:ring focus:ring-emerald-400'
											)}
											onClick={() => removeKoder(idx)}>
											<span>Remove</span>
											<span>
												<svg
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="currentColor"
													className="h-4 w-4">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M6 18L18 6M6 6l12 12"
													/>
												</svg>
											</span>
										</button>
									</li>
								))}
							</ul>
						</div>
					) : (
						<div className="rounded-md bg-emerald-300 p-4 pt-0 shadow-lg">
							<header className="flex h-16 items-center justify-between font-bold text-emerald-950">
								<span>Koders List</span>
							</header>
							<div className="flex items-center justify-center h-32">
								<span>No koders added</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
