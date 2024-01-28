import React from 'react';

const Table = ({ data }) => {
  const handleDelete = (id) => {
    // Make a DELETE request to the backend API
    fetch(`http://localhost:8000/lawyers/${id}/`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          console.log('Lawyer deleted successfully');
          // Optionally, update the state or re-fetch the lawyer list
        } else {
          console.error('Failed to delete lawyer');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <table style={{ border: '2px solid #000', borderCollapse: 'collapse', width: '100%' }}>
      <thead style={{ backgroundColor: 'black', color: 'white' }}>
        <tr>
          <th style={{ border: '1px solid #fff' }}>avocat_id</th>
          <th style={{ border: '1px solid #fff' }}>username</th>
          <th style={{ border: '1px solid #fff' }}>specialite</th>
          <th style={{ border: '1px solid #fff' }}>langue</th>
          <th style={{ border: '1px solid #fff' }}>Adresse</th>
          <th style={{ border: '1px solid #fff' }}>Numero_de_telephone</th>
          <th style={{ border: '1px solid #fff' }}>Edit</th>
        </tr>
      </thead>
      <tbody style={{ backgroundColor: '#FDECEC' }}>
        {data.map((row, index) => (
          <tr key={index} style={{ height: '40px' }}>
            <td style={{ border: '4px solid #fff' }}>{row.avocat_id}</td>
            <td style={{ border: '4px solid #fff' }}>{row.username}</td>
            <td style={{ border: '4px solid #fff' }}>{row.specialite}</td>
            <td style={{ border: '4px solid #fff' }}>{row.langue}</td>
            <td style={{ border: '4px solid #fff' }}>{row.Adresse}</td>
            <td style={{ border: '4px solid #fff' }}>{row.Numero_de_telephone}</td>
            <td style={{ border: '4px solid #fff', textAlign: 'center' }}>
              <button
                onClick={() => handleDelete(row.avocat_id)}
                style={{ width: '90%', backgroundColor: 'red', border: 'none', cursor: 'pointer' }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
