import React from 'react';

const Nutrition = () => {
	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Nutrition Facts</h1>

			{/* Random Nutrition Fact 1 */}
			<div className="bg-white p-4 rounded-md shadow-md mb-4">
				<h2 className="text-xl font-semibold mb-2">Bananas</h2>
				<p>Bananas are an excellent source of potassium, vitamin B6, and contain moderate amounts of vitamin C, manganese and dietary fiber.</p>
			</div>

			{/* Random Nutrition Fact 2 */}
			<div className="bg-white p-4 rounded-md shadow-md mb-4">
				<h2 className="text-xl font-semibold mb-2">Spinach</h2>
				<p>Spinach is rich in iron, calcium, and vitamins A, C, and K. It's also loaded with cancer-fighting antioxidants and is an excellent source of magnesium.</p>
			</div>

			{/* Random Nutrition Fact 3 */}
			<div className="bg-white p-4 rounded-md shadow-md mb-4">
				<h2 className="text-xl font-semibold mb-2">Almonds</h2>
				<p>Almonds are packed with vitamins, minerals, protein, and fiber, and are associated with several health benefits. Just a handful of almonds, approximately one ounce, contains one-eighth of a person’s daily protein needs.</p>
			</div>

			{/* Random Nutrition Fact 4 */}
			<div className="bg-white p-4 rounded-md shadow-md mb-4">
				<h2 className="text-xl font-semibold mb-2">Salmon</h2>
				<p>Salmon is a great source of omega-3 fatty acids, which have been linked to various health benefits, such as reducing inflammation, lowering blood pressure, and decreasing risk factors for diseases.</p>
			</div>

			{/* Random Nutrition Fact 5 */}
			<div className="bg-white p-4 rounded-md shadow-md mb-4">
				<h2 className="text-xl font-semibold mb-2">Eggs</h2>
				<p>Eggs are among the most nutritious foods on the planet. A whole egg contains all the nutrients required to turn a single cell into a chicken. They're a great source of protein and healthy fats.</p>
			</div>
		</div>
	);
};

export default Nutrition;