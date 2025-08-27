// This file simulates API calls with mock data

export const fetchUserData = async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      profilePic: "/placeholder.svg?height=60&width=60",
      weight: 73.2,
      height: 168,
      age: 24
    };
  };
  
  export const fetchWeightData = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      data: [75, 74.5, 74.8, 74.2, 73.9, 73.5, 73.2],
    };
  };
  
  export const fetchWorkouts = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { title: "Squats", bodyPart: "Legs", reps: "3 sets x 12 reps", image: "/placeholder.svg?height=60&width=60" },
      { title: "Bench Press", bodyPart: "Chest", reps: "4 sets x 10 reps", image: "/placeholder.svg?height=60&width=60" },
      { title: "Pull-ups", bodyPart: "Back", reps: "3 sets x 8 reps", image: "/placeholder.svg?height=60&width=60" },
      { title: "Shoulder Press", bodyPart: "Shoulders", reps: "3 sets x 10 reps", image: "/placeholder.svg?height=60&width=60" },
      { title: "Lunges", bodyPart: "Legs", reps: "3 sets x 12 reps each leg", image: "/placeholder.svg?height=60&width=60" },
      { title: "Bicep Curls", bodyPart: "Arms", reps: "3 sets x 12 reps", image: "/placeholder.svg?height=60&width=60" },
      { title: "Tricep Extensions", bodyPart: "Arms", reps: "3 sets x 12 reps", image: "/placeholder.svg?height=60&width=60" },
    ];
  };
  
  export const fetchTrainers = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      {
        id: 1,
        name: "John Arnold",
        expertise: "Weight training",
        image: "/placeholder.svg?height=150&width=100",
        color: "bg-orange-400",
      },
      {
        id: 2,
        name: "Adam Smith",
        expertise: "Fitness expert",
        image: "/placeholder.svg?height=150&width=100",
        color: "bg-purple-400",
      },
    ];
  };
  
  export const fetchEvents = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { id: 1, title: "Yoga Class", date: "2023-06-15", time: "10:00 AM" },
      { id: 2, title: "Personal Training", date: "2023-06-16", time: "2:00 PM" },
      { id: 3, title: "Group Run", date: "2023-06-17", time: "7:00 AM" },
      { id: 4, title: "Nutrition Seminar", date: "2023-06-18", time: "6:00 PM" },
    ];
  };
  
  export const fetchMessages = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { id: 1, name: "John Doe", message: "Great job on your workout!", time: "15m ago", avatar: "/placeholder.svg?height=40&width=40" },
      { id: 2, name: "Jane Smith", message: "Don't forget our session tomorrow", time: "1h ago", avatar: "/placeholder.svg?height=40&width=40" },
      { id: 3, name: "Mike Johnson", message: "How was your run yesterday?", time: "2h ago", avatar: "/placeholder.svg?height=40&width=40" },
    ];
  };