import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Label, Header, Grid, Icon, Card, Image } from 'semantic-ui-react'

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showProfile: false,
        }

        this.renderProfile = this.renderProfile.bind(this);
        this.renderVideo = this.renderVideo.bind(this);
        this.profileButton = this.profileButton.bind(this);
        this.videoButton = this.videoButton.bind(this);
    };

    renderProfile() {
        const { photoId, currentEmployment, visa, level } = this.props.feed;
        return (
            <Card.Content>
                <Grid columns={2} >
                    <Grid.Column style={{ padding: 0 }}>
                        <Image src={photoId ? photoId : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'} />
                    </Grid.Column>
                    <Grid.Column>
                        <Header size='small' content="Talent Snapshot" />
                        <Header sub>Current Employer</Header>
                        <span>{currentEmployment ? currentEmployment : "ABC"}</span>
                        <Header sub>Visa Status</Header>
                        <span>{visa ? visa : "Citizen"}</span>
                        <Header sub>Position</Header>
                        <span>{level ? level : "Software Developer"}</span>
                    </Grid.Column>
                </Grid>
            </Card.Content>
        )
    }

    renderVideo() {
        return (
            <ReactPlayer
                url='test.mp4'
                width="100%"
                //height="100%"
                controls={true}>
            </ReactPlayer>

        )
    }

    profileButton() {
        return (
            <Grid.Column className="center aligned">
                <Icon size="large"
                    name="user"
                    link
                    onClick={() => this.setState({ showProfile: true })}
                />
            </Grid.Column>
        )
    }

    videoButton() {
        return (
            <Grid.Column className="center aligned">
                <Icon size="large"
                    name="video camera"
                    link
                    onClick={() => this.setState({ showProfile: false })}
                />
            </Grid.Column>
        )
    }

    render() {
        if (this.props.feed) {
            const { name, skills } = this.props.feed;

            return (
                <Card fluid>
                    <Card.Content>
                        <Card.Header>{name}
                            <div className="ui right floated">
                                <Icon name="star" size="big" floated='right' />
                            </div>
                        </Card.Header>
                    </Card.Content>

                    {this.state.showProfile ? this.renderProfile() : this.renderVideo()}

                    <Card.Content style={{ paddingtop: 0 }}>
                        <Grid columns={4}>
                            {this.state.showProfile ? this.videoButton() : this.profileButton()}
                            <Grid.Column className="center aligned">
                                <Icon link size="large" name="file pdf outline" />
                            </Grid.Column>
                            <Grid.Column className="center aligned">
                                <Icon link size="large" name="linkedin" />
                            </Grid.Column>
                            <Grid.Column className="center aligned">
                                <Icon link size="large" name="github" />
                            </Grid.Column>
                        </Grid>
                    </Card.Content>
                    <Card.Content >
                        {skills.length > 0 ?
                            skills.map((skill, index) =>
                                <Label as='a' key={index} basic color='blue'>
                                    {skill}
                                </Label>
                            )
                            :
                            <Label as='a' basic color='blue'>
                                C#
                            </Label>
                        }
                    </Card.Content>
                </Card >
            )
        }

        return null;
    }
}