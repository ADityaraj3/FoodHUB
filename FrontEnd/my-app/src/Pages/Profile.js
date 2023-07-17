import './Profile.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, {useState, useContext, useEffect} from "react";
import { UserContext } from '../UserContext';

export default function ProfilePage() {

  const [newHeight, setHeight]=useState('');
  const [newWeight, setWeight]= useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      setIsEditing(false);
      console.log(userInfo);
      const response = await fetch('http://localhost:4000/update', {
        method: 'PUT',
        body: JSON.stringify({ username: userInfo?.username }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (response.ok) {
        alert('Update successful');

        // Optional: Update the state with the new height and weight values
        setUserInfo(prevUserInfo => ({
          ...prevUserInfo,
          height: newHeight,
          weight: newWeight
        }));
  
      } else {
        alert('Update failed');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Update failed');
    }
  };
  
  

    const {setUserInfo, userInfo} = useContext(UserContext);
    useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

    const username= userInfo?.username;
    const height= parseFloat(userInfo?.height);
    const weight= parseFloat(userInfo?.weight);
    const BMI= (weight*10000)/(height*height);

  

  return (
    <section className="bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-4 mb-sm-5">
              <div className="card card-style1 border-0">
                <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                  <div className="row align-items-center">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                      <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="..." />
                    </div>
                    {isEditing ? (
                      <div className="col-lg-6 px-xl-10">
                      <div className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                        <h3 className="h2 text-white mb-0">{username}</h3>
                        <span className="text-primary">Coach</span>
                      </div>
                      <ul className="list-unstyled mb-1-9">
                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">
                          <label>Height(in cm):</label>
                          </span> 
                          <input
                            type="text"
                            value={newHeight}
                            onChange= {(e)=> setHeight(e.target.value)}
                          />
                        </li>
                        <li className="mb-2 mb-xl-3 display-28">
                          <span className="display-26 text-secondary me-2 font-weight-600">
                            Weight(in kg):
                          </span> 
                          <input
                            type="text"
                            value={newWeight}
                            onChange= {(e)=> setWeight(e.target.value)}
                          />
                        </li>
                        <li className="mb-2 mb-xl-3 display-28">
                          <span className="display-26 text-secondary me-2 font-weight-600">
                            BMI:
                          </span> 
                          {BMI}
                        </li>
                        <li className="mb-2 mb-xl-3 display-28">
                          <span className="display-26 text-secondary me-2 font-weight-600">
                            Website:
                          </span> 
                        www.example.com
                        </li>
                        <li className="display-28">
                          <span className="display-26 text-secondary me-2 font-weight-600">
                            Phone:
                          </span> 
                        507 - 541 - 4567
                        </li>
                        <button onClick={handleSaveClick}>Save</button>
                      </ul>
                      <ul className="social-icon-style1 list-unstyled mb-0 ps-0">
                        <li><a href="#!"><i className="ti-twitter-alt" /></a></li>
                        <li><a href="#!"><i className="ti-facebook" /></a></li>
                        <li><a href="#!"><i className="ti-pinterest" /></a></li>
                        <li><a href="#!"><i className="ti-instagram" /></a></li>
                      </ul>
                    </div>
                    ) : (
                      <div className="col-lg-6 px-xl-10">
                      <div className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                        <h3 className="h2 text-white mb-0">{username}</h3>
                        <span className="text-primary">Coach</span>
                      </div>
                      <ul className="list-unstyled mb-1-9">
                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Height(in cm):</span> {height}</li>
                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Weight(in kg):</span> {weight}</li>
                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">BMI:</span> {BMI}</li>
                        <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Website:</span> www.example.com</li>
                        <li className="display-28"><span className="display-26 text-secondary me-2 font-weight-600">Phone:</span> 507 - 541 - 4567</li>
                        <button onClick={handleEditClick}>Edit</button>
                      </ul>
                      <ul className="social-icon-style1 list-unstyled mb-0 ps-0">
                        <li><a href="#!"><i className="ti-twitter-alt" /></a></li>
                        <li><a href="#!"><i className="ti-facebook" /></a></li>
                        <li><a href="#!"><i className="ti-pinterest" /></a></li>
                        <li><a href="#!"><i className="ti-instagram" /></a></li>
                      </ul>
                      
                    </div>
                    )}

                    
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-12 mb-4 mb-sm-5">
                  <div className="mb-4 mb-sm-5">
                    <span className="section-title text-primary mb-3 mb-sm-4">Skill</span>
                    <div className="progress-text">
                      <div className="row">
                        <div className="col-6">Driving range</div>
                        <div className="col-6 text-end">80%</div>
                      </div>
                    </div>
                    <div className="custom-progress progress progress-medium mb-3" style={{height: '4px'}}>
                      <div className="animated custom-bar progress-bar slideInLeft bg-secondary" style={{width: '80%'}} aria-valuemax={100} aria-valuemin={0} aria-valuenow={10} role="progressbar" />
                    </div>
                    <div className="progress-text">
                      <div className="row">
                        <div className="col-6">Short Game</div>
                        <div className="col-6 text-end">90%</div>
                      </div>
                    </div>
                    <div className="custom-progress progress progress-medium mb-3" style={{height: '4px'}}>
                      <div className="animated custom-bar progress-bar slideInLeft bg-secondary" style={{width: '90%'}} aria-valuemax={100} aria-valuemin={0} aria-valuenow={70} role="progressbar" />
                    </div>
                    <div className="progress-text">
                      <div className="row">
                        <div className="col-6">Side Bets</div>
                        <div className="col-6 text-end">50%</div>
                      </div>
                    </div>
                    <div className="custom-progress progress progress-medium mb-3" style={{height: '4px'}}>
                      <div className="animated custom-bar progress-bar slideInLeft bg-secondary" style={{width: '50%'}} aria-valuemax={100} aria-valuemin={0} aria-valuenow={70} role="progressbar" />
                    </div>
                    <div className="progress-text">
                      <div className="row">
                        <div className="col-6">Putting</div>
                        <div className="col-6 text-end">60%</div>
                      </div>
                    </div>
                    <div className="custom-progress progress progress-medium" style={{height: '4px'}}>
                      <div className="animated custom-bar progress-bar slideInLeft bg-secondary" style={{width: '60%'}} aria-valuemax={100} aria-valuemin={0} aria-valuenow={70} role="progressbar" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
