import { useState, useEffect } from 'react';
import { Col, Card, Button,Modal, Form } from 'react-bootstrap';
import { database } from '../login-signup/firebaseConfig';
import './ContractDashboard.css';
// import { useEffect, useState } from 'react';
// import { initializeApp } from 'firebase/app';
import { getDatabase, ref,  onValue, remove  } from 'firebase/database';





const database2 = getDatabase(firebase);
const ContractDashboard = () => {
  const [crud, setCrud] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [newContract, setNewContract] = useState({ name: '', amount: '' });
  const [editingContractId, setEditingContractId] = useState(null);


  /// contracts crud
  useEffect(() => {
  
    const crudRef = database.ref('crud');
    crudRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const crudArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setCrud(crudArray);
      }
    });

    return () => {
     
      crudRef.off('value');
    };
  }, []);

 

  const handleEditContract = (contractId) => {
    const selectedContract = crud.find((contract) => contract.id === contractId);
    setEditingContractId(contractId);
    setNewContract({ name: selectedContract.name, amount: selectedContract.amount });
    setEditModal(true);
  };
  const handleAddContract = () => {
    const crudRef = database.ref('crud');
    const newContractRef = crudRef.push();
    newContractRef.set(newContract);

    setNewContract({ name: '', amount: '' });
    setShowModal(false);
  };

  const handleUpdateContract = () => {
    if (!editingContractId) {
      console.error("Editing contract ID is not set.");
      return;
    }


    const crudRef = database.ref(`crud/${editingContractId}`);
    crudRef.update(newContract);

    setNewContract({ name: '', amount: '' });
    setEditingContractId(null);
    setEditModal(false);
  };
  
  const handleDeleteContract = (id) => {
    const crudRef = database.ref(`crud/${id}`);
    crudRef.remove();
  };


//// Contract table:
const [contractData, setContractData] = useState({
  email: '',
  playerName: '',
  phoneNumber: '',

});

// const [validationError, setValidationError] = useState('');
const [contractsList, setContractsList] = useState([]);
const [acceptedPlayerId, setAcceptedPlayerId] = useState(null);
useEffect(() => {
  const contractsRef = ref(database, 'contracts/players');
  

  onValue(contractsRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const contractsArray = Object.keys(data).map((key) => ({ 
        id: key, 
        userId: key,
        ...data[key] 
      }));
      setContractsList(contractsArray);
    } else {
      setContractsList([]);
    }
  });

  return () => {
    // Cleanup the listener when the component unmounts
  };
}, []);


const handleDeletePlayer = (id) => {
  const contractsRef = ref(database, `contracts/players/${id}`);
  remove(contractsRef)
    .then(() => {
      console.log(`Player with id ${id} deleted successfully.`);
    })
    .catch((error) => {
      console.error('Error deleting player:', error);
    });
};

useEffect(() => {
  if (acceptedPlayerId) {
    alert(`Player with id ${acceptedPlayerId} has been accepted.`);
    setAcceptedPlayerId(null);
  }
}, [acceptedPlayerId]);






return (

  <>
  <section className='back'>
    <h1> # Dashborad </h1>

  </section>
  
<section className="dashboard-container">

  <div>
 
    <div  className="sidebar">
    <Card>
      <Card.Body className='d-flex flex-column justify-content-between align-items-center'>
       
        <div>
       
        <Button variant="primary" className="sidebar-button" onClick={()=> setShowModal(true)}>

          Add Contract</Button>
      
       </div>
        

      </Card.Body>
    </Card>
    </div>
    <Col md={12} className="main-content">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Delete contract</th>
              <th>Edit contract</th>
            </tr>
          </thead>
          <tbody>
          {crud.map((contract) => (
        <tr key={contract.id}>
          <td>{contract.id}</td>
          <td>{contract.name}</td>
          <td>{contract.amount}</td>
          <td>
         <Button
           variant="primary"
           className="edit-button"
           onClick={() => handleEditContract(contract.id)}>
        Edit
      </Button>
    </td>
    <td>
      <Button
        variant="danger"
        className="delete-button"
        onClick={() => handleDeleteContract(contract.id)}>
        Delete
      </Button>
    </td>
  </tr>
       ))}

          </tbody>
        </table>
     
   
    </Col>

 </div>
  <Modal show={showModal} onHide={()=> setShowModal(false)}
  className="d-flex align-items-center justify-content-center">
    <Modal.Header closeButton>
      <Modal.Title>Add Contract</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formContractName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter contract name" value={newContract.name} onChange={(e)=>
            setNewContract({ ...newContract, name: e.target.value })}
            />
        </Form.Group>
        <Form.Group controlId="formContractAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control type="text" placeholder="Enter contract amount" value={newContract.amount} onChange={(e)=>
            setNewContract({ ...newContract, amount: e.target.value })}
            />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
     
      <Button variant="primary" onClick={handleAddContract}>
        Add Contract
      </Button>
    </Modal.Footer>
  </Modal>

  
    {/* edit popup */}
    <Modal show={editModal} onHide={() => setEditModal(false)}
    className="d-flex align-items-center justify-content-center">
    <Modal.Header closeButton>
      <Modal.Title> Edit Contract</Modal.Title>
    </Modal.Header>
     
        <Modal.Body>
          <Form>
            <Form.Group controlId="formContractName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter contract name"
                value={newContract.name || ''} 
                onChange={(e) =>
                  setNewContract({ ...newContract, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formContractAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter contract amount"
                value={newContract.amount || ''} 
                onChange={(e) =>
                  setNewContract({ ...newContract, amount: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
    <Modal.Footer>
     
      <Button variant="primary" onClick={handleUpdateContract}>
        Update
      </Button>
    </Modal.Footer>
  </Modal>
</section>

<section className='players'>
<h2> Requested Contracts </h2>

<div>
  <table className="contracts-table">
    <thead>
      <tr>
        <th>Player Key</th>
        <th>Player Name</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Delete </th>
        <th>Accept</th>
      </tr>
    </thead>
    <tbody>
      {contractsList.map((contract) => (
        <tr key={contract.id}>
          <td>{contract.userId}</td>
          <td>{contract.playerName}</td>
          <td>{contract.email}</td>
          <td>{contract.phoneNumber}</td>
          <td> <Button variant="danger" className="delete-button"
          onClick={() => handleDeletePlayer(contract.id)}>
            Delete </Button></td>
          <td> <Button variant="primary" 
               onClick={() => {setAcceptedPlayerId(contract.id);}}>
           Accept
          </Button> </td>


        </tr>
      ))}
    </tbody>
  </table>
</div>

  </section>
</>
);
};

export default ContractDashboard;