import React from 'react';
import Cookies from 'js-cookie';
import { loaderData } from '../Layout/BodyWrapper.jsx';

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            employerData: {
                companyContact: {
                    name: "",
                    location: {
                        city: "",
                        country: "",
                    },
                }
            },
            loaderData: loaderData
        };

        this.init = this.init.bind(this);
        this.loadData = this.loadData.bind(this);
        this.updateWithoutSave = this.updateWithoutSave.bind(this);
    }

    init() {
        let loaderData = this.state.loaderData;
        loaderData.allowedUsers.push("Employer");
        loaderData.allowedUsers.push("Recruiter");
        loaderData.isLoading = false;
        this.setState({ loaderData, })
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://talentadvanceservicesprofile.azurewebsites.net/profile/profile/getEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                //console.log(res)
                let employerData = null;
                if (res.employer) {
                    employerData = res.employer
                }
                this.updateWithoutSave(employerData)
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
        this.init()
    }

    updateWithoutSave(newData) {
        let newSD = Object.assign({}, this.state.employerData, newData)
        this.setState({
            employerData: newSD
        })
    }

    render() {
        const { companyContact } = this.state.employerData;

        return (
            <div className="ui card">
                <div className="content">
                    <div className="center aligned" style={{ marginBottom: 10 }}>
                        <img src='https://react.semantic-ui.com/images/wireframe/square-image.png' className="ui tiny circular image" />
                    </div>
                    <div className="center aligned header">{companyContact.name}</div>
                    <div className="center aligned meta">
                        <i className="map pin icon"></i>
                        {companyContact.location.city + ", " + companyContact.location.country}
                    </div>
                    <div className="center aligned description">
                        <p>We currently do not have specific skills that we desire.</p>
                    </div>
                </div>
                <div className="extra content">
                    <div className="meta">
                        <i className="phone icon"></i>
                        {": " + companyContact.phone}
                    </div>
                    <div className="meta">
                        <i className="envelope icon"></i>
                        {": " + companyContact.email}
                    </div>
                </div>
            </div >
        )
    }
}