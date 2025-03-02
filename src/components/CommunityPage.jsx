"use client"

import { useState, useRef, useEffect, useContext } from "react"
import axios from "axios"
import "./CommunityPage.css"
import { LogAuthContext } from "@/context/LogAuth"

const firebaseURL =
  "https://masai-hackathon-2025-default-rtdb.firebaseio.com/community/community";

const CommunityPage = () => {
  const [communities, setCommunities] = useState([])
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingCommunityId, setEditingCommunityId] = useState(null)
  const [communityName, setCommunityName] = useState("")
  const [communityDescription, setCommunityDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const popoverRef = useRef(null)
  const { currentUser } = useContext(LogAuthContext)

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsCreateOpen(false)
        setIsEditOpen(false)
      }
    }
  
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    fetchCommunities();
  }, [])

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${firebaseURL}.json`);
      const data = response.data;
      
      if (data) {
        const communitiesArray = Object.entries(data).map(([id, communityData]) => ({
          id,
          ...communityData
        }));
        setCommunities(communitiesArray);
      } else {
        setCommunities([]);
      }
    } catch (error) {
      console.error("Error fetching communities:", error);
      alert("Failed to load communities. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const createCommunity = async () => {
    if (!currentUser) {
      alert("You must be logged in to create a community");
      return;
    }
    
    if (!communityName.trim()) {
      alert("Community name is required");
      return;
    }
    
    try {
      setLoading(true);
      const newCommunity = {
        name: communityName,
        description: communityDescription,
        createdAt: new Date().toISOString(),
        author: currentUser?.email || "Anonymous",
        members: [currentUser],
        posts: []
      };
      
      const response = await axios.post(`${firebaseURL}.json`, newCommunity);
      
      
      if (response.data && response.data.name) {
        setCommunities([...communities, { 
          id: response.data.name, 
          ...newCommunity 
        }]);
      }
      
      setCommunityName("");
      setCommunityDescription("");
      setIsCreateOpen(false);
      alert("Community created successfully!");
    } catch (error) {
      console.error("Error creating community:", error);
      alert("Failed to create community. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const updateCommunity = async () => {
    if (!currentUser) {
      alert("You must be logged in to update a community");
      return;
    }
    
    if (!communityName.trim() || !editingCommunityId) return;
    
    try {
      setLoading(true);
      const updatedData = {
        name: communityName,
        description: communityDescription,
        updatedAt: new Date().toISOString()
      };
      
      await axios.patch(`${firebaseURL}/${editingCommunityId}.json`, updatedData);
      
     
      setCommunities(
        communities.map((comm) =>
          comm.id === editingCommunityId ? { ...comm, ...updatedData } : comm
        )
      );
      
      setCommunityName("");
      setCommunityDescription("");
      setIsEditOpen(false);
      setEditingCommunityId(null);
      alert("Community updated successfully!");
    } catch (error) {
      console.error("Error updating community:", error);
      alert("Failed to update community. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const startEdit = (community) => {
    setCommunityName(community.name)
    setCommunityDescription(community.description)
    setEditingCommunityId(community.id)
    setIsEditOpen(true)
  }

  const joinCommunity = async (communityId) => {
    if (!currentUser) {
      alert("You must be logged in to join a community");
      return;
    }
    
    try {
      setLoading(true);
      
      const community = communities.find(comm => comm.id === communityId);
      if (!community) return;
      
      
      if (community.members && community.members.some(m => m.email === currentUser.email)) {
        return;
      }
      
     
      const updatedMembers = [...(community.members || []), currentUser];
      
     
      await axios.patch(`${firebaseURL}/${communityId}.json`, {
        members: updatedMembers
      });
      
      // Update local state
      setCommunities(
        communities.map((comm) => {
          if (comm.id === communityId) {
            return {
              ...comm,
              members: updatedMembers
            };
          }
          return comm;
        })
      );
      
      alert("Joined community successfully!");
    } catch (error) {
      console.error("Error joining community:", error);
      alert("Failed to join community. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const deleteCommunity = async (communityId) => {
    if (!currentUser) {
      alert("You must be logged in to delete a community");
      return;
    }
    
    if (!confirm("Are you sure you want to delete this community?")) {
      return;
    }
    
    try {
      setLoading(true);
      await axios.delete(`${firebaseURL}/${communityId}.json`);
      
      // Remove from local state
      setCommunities(communities.filter((comm) => comm.id !== communityId));
      alert("Community deleted successfully!");
    } catch (error) {
      console.error("Error deleting community:", error);
      alert("Failed to delete community. Please try again.");
    } finally {
      setLoading(false);
    }
  }

 
  const isAuthor = (community) => {
    if (!currentUser || !community.author) return false;
    return community.author === currentUser.email;
  }

 
  const isMember = (community) => {
    if (!currentUser || !community.members) return false;
    return community.members.some(m => m.email === currentUser?.email);
  }

  return (
    <div className="community-page">
      <header className="community-header">
        <h1 style={{ color: "white" }}>Communities</h1>
        <button
          className="create-button"
          onClick={() => {
            if (!currentUser) {
              alert("You must be logged in to create a community");
              return;
            }
            setCommunityName("")
            setCommunityDescription("")
            setIsCreateOpen(true)
            setIsEditOpen(false)
          }}
          disabled={loading || !currentUser}
        >
          Create Community
        </button>
      </header>

      {isCreateOpen && (
        <div className="popover-backdrop">
          <div className="popover" ref={popoverRef}>
            <h2>Create a Community</h2>
            <div className="form-group">
              <label htmlFor="community-name">Community Name</label>
              <input
                id="community-name"
                type="text"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                placeholder="Enter community name"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="community-description">Description</label>
              <textarea
                id="community-description"
                value={communityDescription}
                onChange={(e) => setCommunityDescription(e.target.value)}
                placeholder="Describe your community"
                rows={4}
                disabled={loading}
              />
            </div>
            <div className="popover-actions">
              <button 
                className="cancel-button" 
                onClick={() => setIsCreateOpen(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                className="submit-button" 
                onClick={createCommunity}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Community"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditOpen && (
        <div className="popover-backdrop">
          <div className="popover" ref={popoverRef}>
            <h2>Edit Community</h2>
            <div className="form-group">
              <label htmlFor="edit-community-name">Community Name</label>
              <input
                id="edit-community-name"
                type="text"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-community-description">Description</label>
              <textarea
                id="edit-community-description"
                value={communityDescription}
                onChange={(e) => setCommunityDescription(e.target.value)}
                rows={4}
                disabled={loading}
              />
            </div>
            <div className="popover-actions">
              <button 
                className="cancel-button" 
                onClick={() => setIsEditOpen(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                className="submit-button" 
                onClick={updateCommunity}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Community"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="communities-container">
        {loading && communities.length === 0 ? (
          <div className="loading-state">
            <p>Loading communities...</p>
          </div>
        ) : communities.length === 0 ? (
          <div className="empty-state">
            <p>No communities yet. Create one to get started!</p>
          </div>
        ) : (
          communities.map((community) => (
            <div key={community.id} className="community-card">
              <div className="community-header">
                <h2>{community.name}</h2>
                <div className="community-meta">
                  <span className="member-count">
                    {community.members ? community.members.length : 0} members
                  </span>
                  <span className="date">
                    {new Date(community.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <p className="community-description">{community.description}</p>

              <div className="community-author">
                <div className="author-avatar">
                  {community.author && community.author.charAt(0).toUpperCase()}
                </div>
                <span>Created by {community.author || "Anonymous"}</span>
              </div>

              <div className="community-actions">
                {isAuthor(community) ? (
                  <>
                    <button 
                      className="edit-button" 
                      onClick={() => startEdit(community)}
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-button" 
                      onClick={() => deleteCommunity(community.id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <button
                    className="join-button"
                    disabled={loading || !currentUser || isMember(community)}
                    onClick={() => joinCommunity(community.id)}
                  >
                    {isMember(community) ? "Joined" : "Join"}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default CommunityPage;


