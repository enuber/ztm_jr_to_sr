import React from 'react';
import Link from 'next/link';

// Function to fetch robots data using SSR
const fetchRobots = async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) {
      throw new Error('Failed to fetch robots data');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching robots:', error);
    return []; // Return an empty array in case of error
  }
};

// Server Component to display robots
const RobotsPage = async () => {
  const robots = await fetchRobots();

  return (
    <div>
      <h1>Robots</h1>
      <Link href="/">Home</Link>
      <ul>
        {robots.length > 0 ? (
          robots.map((robot) => (
            <li key={robot.id}>
              {robot.name} - {robot.email}
            </li>
          ))
        ) : (
          <li>No data available</li>
        )}
      </ul>
    </div>
  );
};

export default RobotsPage;

// CSR

// // pages/robots.js
// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// export default function Robots() {
//   const [robots, setRobots] = useState([]);

//   useEffect(() => {
//     async function fetchRobots() {
//       try {
//         const res = await fetch('https://jsonplaceholder.typicode.com/users');
//         if (!res.ok) {
//           throw new Error('Failed to fetch robots data');
//         }
//         const data = await res.json();
//         setRobots(data);
//       } catch (error) {
//         console.error('Error fetching robots:', error);
//       }
//     }

//     fetchRobots();
//   }, []);

//   if (robots.length === 0) {
//     return <div>Loading or no data available</div>;
//   }

//   return (
//     <div>
//       <h1>Robots</h1>
//       <Link href="/">Home</Link>
//       <ul>
//         {robots.map((robot) => (
//           <li key={robot.id}>
//             {robot.name} - {robot.email}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
