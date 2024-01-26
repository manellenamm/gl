

const RdvTable = ({ data }) => {
  
  const handleDelete= ()=>{
      console.log('deleting appointment...')
  }

  const handleAccept= ()=>{
    console.log('Accepting appointment...')
}

  return (
    <table style={{border: '2px solid #000', borderCollapse: 'collapse', width:'100%'}}>
      <thead style={{backgroundColor:'black', color:'white'}}>
        <tr >
          <th style={{border: '1px solid #fff', width:'15%',}}>Name</th>
          <th style={{border: '1px solid #fff', width:'15%',}}>Surname</th>
          <th style={{border: '1px solid #fff', width:'30%',}}>Email</th>
          <th style={{border: '1px solid #fff', width:'10%',}}>Phone number</th>
          <th style={{border: '1px solid #fff', width:'7%',}}>Time</th>
          <th style={{border: '1px solid #fff', width:'7%',}}>Date</th>
          <th style={{border: '1px solid #fff',}}>Edit</th>
        </tr>
      </thead>
      <tbody style={{backgroundColor:'#FDECEC'}}>
        {data.map((row, index) => (
          <tr key={index} style={{height:'40px'}}>
            <td style={{border: '4px solid #fff', width:'15%',}}>{row.id}</td>
            <td style={{border: '4px solid #fff', width:'15%',}}>{row.firstName}</td>
            <td style={{border: '4px solid #fff', width:'30%',}}>{row.familyName}</td>
            <td style={{border: '4px solid #fff', width:'10%',}}>{row.specialty}</td>
            <td style={{border: '4px solid #fff', width:'7%',}}>{row.email}</td>
            <td style={{border: '4px solid #fff', width:'7%',}}>{row.city}</td>
            <td style={{border: '4px solid #fff',textAlign:'center'}}>
              <button onClick={handleDelete} style={{margin:'5px',width:'40%',backgroundColor:'red', border:'none', cursor:'pointer'}}>decline</button>
              <button onClick={handleAccept} style={{margin:'5px',width:'40%',backgroundColor:'green', border:'none', cursor:'pointer'}}>Accept</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RdvTable;