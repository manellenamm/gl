

const Table = ({ data }) => {
  
  const handleDelete= ()=>{
      console.log('deleting lawyer...')
  }

  return (
    <table style={{border: '2px solid #000', borderCollapse: 'collapse', width:'100%'}}>
      <thead style={{backgroundColor:'black', color:'white'}}>
        <tr >
          <th style={{border: '1px solid #fff',}}>ID</th>
          <th style={{border: '1px solid #fff',}}>First Name</th>
          <th style={{border: '1px solid #fff',}}>Family Name</th>
          <th style={{border: '1px solid #fff',}}>Specialty</th>
          <th style={{border: '1px solid #fff',}}>Email</th>
          <th style={{border: '1px solid #fff',}}>City</th>
          <th style={{border: '1px solid #fff',}}>Edit</th>
        </tr>
      </thead>
      <tbody style={{backgroundColor:'#FDECEC'}}>
        {data.map((row, index) => (
          <tr key={index} style={{height:'40px'}}>
            <td style={{border: '4px solid #fff',}}>{row.id}</td>
            <td style={{border: '4px solid #fff',}}>{row.firstName}</td>
            <td style={{border: '4px solid #fff',}}>{row.familyName}</td>
            <td style={{border: '4px solid #fff',}}>{row.specialty}</td>
            <td style={{border: '4px solid #fff',}}>{row.email}</td>
            <td style={{border: '4px solid #fff',}}>{row.city}</td>
            <td style={{border: '4px solid #fff',textAlign:'center'}}>
              <button onClick={handleDelete} style={{width:'90%',backgroundColor:'red', border:'none', cursor:'pointer'}}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;