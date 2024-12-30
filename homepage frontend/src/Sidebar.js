import React from 'react';
import './Sidebar.css'; // Assuming you will add new CSS styles
import { FaUserTie, FaHotel, FaCarAlt, FaBookOpen, FaMapMarkerAlt } from 'react-icons/fa'; // Import some icons

function Sidebar({
    setSelectedGuide,
    setSelectedHotel,
    setSelectedDriver,
    setSelectedMentor,
    setSelectedPlaces,
}) {
    // Define the services related to travel with icons
    const menuItems = [
        { name: 'Select Guide', action: () => setSelectedGuide(''), icon: <FaUserTie /> },
        { name: 'Select Hotel', action: () => setSelectedHotel(''), icon: <FaHotel /> },
        { name: 'Select Mentor', action: () => setSelectedMentor(''), icon: <FaBookOpen /> },
        { name: 'Select Driver', action: () => setSelectedDriver(''), icon: <FaCarAlt /> },
        { name: 'Tourist Place Services', action: () => setSelectedPlaces([]), icon: <FaMapMarkerAlt /> },
    ];

    return (
        <div className="sidebar">
            <h2>PlanMyJourney Services</h2>
            <ul className="sidebar-menu">
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        onClick={item.action}
                        className="sidebar-menu-item"
                    >
                        <span className="icon">{item.icon}</span>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
