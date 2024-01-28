import LawyersSectionText from "./lawyersSectionText"
import LawyersLawyer from "./lawyerslawyer"
function LawyersSection() {

    const divStyle = {
        backgroundColor: '#9B7262',
        minHeight: '70vh',
        width: '100%',
        textAlign: 'center',
        margin: '0px',
        padding: '0px',
        boxSizing: 'border-box',


    }

    return <div style={divStyle}>
        <LawyersSectionText />
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginTop: '100px'
        }}
        >
            <LawyersLawyer image name rating description />
        </div>

    </div>
}
export default LawyersSection