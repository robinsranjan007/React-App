// src/layouts/sidenavbar/Sidenavbar.jsx
const Sidenavbar = () => {
    return (
      <div className="flex h-screen flex-col">
        {/* Header - Full width */}
        <div className="bg-gray-800 text-white flex justify-center items-center p-4 text-xl font-bold">
          Admin Dashboard
        </div>
  
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-gray-900 text-white h-full">
            {/* User Name */}
            <div className="text-center p-4 text-xl font-bold text-white">
              Robins Ranjan
            </div>
  
            <ul className="mt-4">
              <li className="py-2 px-4 hover:bg-gray-700">Movies List</li>
              <li className="py-2 px-4 hover:bg-gray-700">TV List</li>
              <li className="py-2 px-4 hover:bg-gray-700">Users</li>
            </ul>
          </div>
          
          {/* Content */}
          <div className="flex-1 bg-gray-100 p-6">
            {/* Main content area */}
            <h1>Content will be displayed here</h1>
          </div>
        </div>
      </div>
    );
  };
  
  export default Sidenavbar;
  