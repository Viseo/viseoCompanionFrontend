import React, {Component} from 'react';
import {ListViewItem}  from 'react-scrollable-list-view';
import FaClockO from 'react-icons/lib/fa/clock-o';
import FaCheckCircleO from 'react-icons/lib/fa/check-circle-o';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import FaMailReply from 'react-icons/lib/fa/mail-reply';
import FaPaperPlane from "react-icons/lib/fa/paper-plane";
import {Button, Col, Container, Input, Option, Row, Textarea} from 'muicss/react';
import moment from "moment";
import {addComment} from "../utils/db";
export default class CommentCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showReply: false,
            content: ''
        };

    }

    render() {
        const {comment, day, time} = this.props;
        const replyBlock = this.state.showReply ? this.renderReply(comment) : null;
        return (
            <div>
                <ListViewItem height={100} key={comment.id}>
                    <Row >
                        <Row style={{borderBottom: '1px  solid rgb(200,200,200)'}}>
                            <Col md="6" style={{textAlign: 'left'}}>
                                <Row style={{color: 'darkred', fontWeight: 'bold'}}>{comment.writer.firstName}</Row>
                            </Col>
                            <Col md="6" className="time" style={{marginTop: 8, textAlign: 'right'}}>
                                <FaClockO style={{fontSize: 16}}/> {day} {time}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                {comment.content}
                            </Col>
                        </Row>
                        <Row>
                            <Button
                                variant="flat"
                            >
                                <FaCheckCircleO style={{fontSize: 16, marginRight: 5, color: '#42A5F5'}}/>
                                Publier
                            </Button>
                            <Button
                                variant="flat"
                            >
                                <FaTimesCircle style={{fontSize: 16, marginRight: 5, color: '#B71C1C'}}/>
                                Bloquer
                            </Button>
                            <Button
                                variant="flat"
                                onClick={() => this.onPressReply()}

                            >
                                <FaMailReply style={{fontSize: 16, marginRight: 5, color: '#558B2F'}}
                                />
                                Répondre
                            </Button>

                        </Row>
                        {replyBlock}
                    </Row>
                </ListViewItem>
            </div>
        )

    }

    onPressReply() {
        this.setState({
                showReply: !this.state.showReply
            }
        )
    }


    setContent = (event) => {

        let inputValue = event.target.value;
        this.setState({
            content: inputValue
        })
    }


    SendReply (id) {
        const childComment = {
            content: this.state.content,
            datetime: moment().valueOf(),
            writer: {
                id: 1,
            },
            eventId: this.props.eventId,
            commentId: id
        };

        addComment(childComment);
    };

    renderReply(comment) {
        return (
            <Row>
                <Row style={{borderBottom: '1px  solid rgb(200,200,200)'}}>
                    <Col md="6" style={{textAlign: 'left'}}>
                        <Row style={{color: 'darkred', fontWeight: 'bold'}}>Admin</Row>
                    </Col>
                    <Col md="6" className="time" style={{marginTop: 8, textAlign: 'right'}}>
                        <FaClockO style={{fontSize: 16}}/> {moment().format("DD/MM/YYYY, hh:mm:ss")}
                    </Col>
                </Row>
                <Row>
                    <textarea style={{width: '100%', marginTop: 12, color: '#0D47A1'}} rows={8}
                              onChange={this.setContent}/>
                </Row>
                <Row>
                    <Button
                        variant="flat"
                        color="primary"
                        style={{backgroundColor: '#42A5F5', color: '#fff'}} onClick={this.SendReply(comment.id)}
                    >
                        <FaPaperPlane style={{fontSize: 16, marginRight: 5, color: '#fff'}}/>
                        Envoyer
                    </Button>
                </Row>
            </Row>
        )
    }
}