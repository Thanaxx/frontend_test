"use client";
import React from "react";
import { useState } from "react";
//install react-select
import Select from 'react-select';
import Avatar from "boring-avatars";
import {
  FaRegCircleXmark,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";


import Modal from "./modal";

import { User } from "./types/user";

export type GalleryProps = {
  users: User[];
};
const Gallery = ({ users }: GalleryProps) => {
  const [usersList, setUsersList] = useState(users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = (id: number) => {
    const user = usersList.find((item) => item.id === id) || null;

    if(user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionB, setSelectedOptionB] = useState(null);
  const [sortedData, setSortedData] = useState([]);


  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);

    const sorted = usersList.sort((a, b) => {
      if (selectedOption.value === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setSortedData;
  };

  const handleSelectChangeB = (selectedOptionB) => {
    setSelectedOptionB(selectedOptionB);

    const sortedb = usersList.sort((a, b) => {
      if (selectedOptionB.value === 'company') {
        return a.company.name.localeCompare(b.company.name);
      }
      else {
        return b.company.name.localeCompare(a.company.name);
      }
    });
    setSortedData;
  };

  return (
    <div className="user-gallery">
        <div className="sort-items">
   
            <div>
              <p className="heading"><b>Users</b></p>
            </div>

            <div className="items-select">
              <div className="items-select-opt">
                <p>Sort Field</p>
                <Select
                  className="selector"
                  value={selectedOptionB}
                  onChange={handleSelectChangeB}
                  options={[
                    { value: 'name', label: 'Name' },
                    { value: 'company', label: 'Company' },
                  ]}/>
              </div>

              <div className="items-select-opt">
                <p>Sort Direction</p>
                <Select
                className="selector"
                  value={selectedOption}
                  onChange={handleSelectChange}
                  options={[
                    { value: 'asc', label: 'Ascending' },
                    { value: 'desc', label: 'Descending' },
                  ]}/>
              </div>
            </div>
  
        </div>

      <div className="items">
        {usersList.map((user, index) => (
          <div
            className="item user-card"
            key={index}
            onClick={() => handleModalOpen(user.id)}
          >
            <div className="body">
              <Avatar
                size={96}
                name={user.name}
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </div>
            <div className="info">
              <div className="name">{user.name}</div>
              <div className="company">{user.company.name}</div>
            </div>
          </div>
        ))}
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <div className="user-panel">
            <div className="header">
              <div
                role="button"
                tabIndex={0}
                className="close"
                onClick={handleModalClose}
              >
                <FaRegCircleXmark size={32} />
              </div>
            </div>
            <div className="body">
              {selectedUser && (
                <div className="user-info info">
                  <div className="avatar">
                    <Avatar
                      size={240}
                      name={selectedUser.name}
                      variant="marble"
                      colors={[
                        "#92A1C6",
                        "#146A7C",
                        "#F0AB3D",
                        "#C271B4",
                        "#C20D90",
                      ]}
                    />
                  </div>
                  <div className="name">
                    {selectedUser.name} ({selectedUser.username})
                  </div>
                  <div className="field">
                    <FaLocationDot className="icon" />
                    <div className="data">{`${selectedUser.address.street}, ${selectedUser.address.suite}, ${selectedUser.address.city}`}</div>
                  </div>
                  <div className="field">
                    <FaPhone className="icon" />
                    <div className="value">{selectedUser.phone}</div>
                  </div>
                  <div className="field">
                    <FaEnvelope className="icon" />
                    <div className="value">{selectedUser.email}</div>
                  </div>
                  <div className="company">
                    <div className="name">{selectedUser.company.name}</div>
                    <div className="catchphrase">
                      {selectedUser.company.catchPhrase}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Gallery;
