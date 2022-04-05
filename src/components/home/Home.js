import './Home.css';
import React from 'react';
import { useNavigate } from 'react-router';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myData: []
        }
    }

    fetchHomeData() {
        fetch('http://localhost:5000/home', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        })
            .then(response => response.json())
            .then((data) => {
                this.setState({ myData: data })
            }
            )
    }

    componentDidMount() {
        this.fetchHomeData();
    }


    render() {
        return (
            <div className="container-home">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genres</th>
                            <th>UserID</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.myData.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{item[0]}</td>
                                    <td>{item[1]}</td>
                                    <td>{item[2]}</td>
                                    <td>{item[3]}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

function WithNavigate(props) {
    const navigate = useNavigate();
    return <Home {...props} navigate={navigate} />
    //(...) will send a copy of props else reference pointer will be sent and all values will be changed
}

export default WithNavigate;
// export default Home;


// {myData.map((item) => (
//     <tr>
//       {item.map((d) => (
//         <td>{d}</td>
//       ))}
//     </tr>
//   ))}