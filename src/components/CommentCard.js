import React, {Component} from 'react';
import {ListViewItem}  from 'react-scrollable-list-view';
import FaClockO from 'react-icons/lib/fa/clock-o';
import FaCheckCircleO from 'react-icons/lib/fa/check-circle-o';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import FaMailReply from 'react-icons/lib/fa/mail-reply';
import FaPaperPlane from "react-icons/lib/fa/paper-plane";
import {Button, Col, Row} from 'muicss/react';
import moment from "moment";
import ChildCommentCard from "./ChildCommentCard";
import {ListView}  from 'react-scrollable-list-view';
import db from "../utils/db";
import UserAvatar from "react-user-avatar";
import UserProfile from "../scenes/UserProfile";

export default class CommentCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showReply: false,
            content: '',
        };
    }

    render() {
        const {comment, day, time} = this.props;
        const replyBlock = this.state.showReply ? this.renderReply(comment) : null;
        const childCommentList = this.props.comment.children.length > 0
            ? this.renderChildComments(comment.children) : null;
        return (
            <div>
                <ListViewItem height={100} key={comment.id}>
                    <Row>
                        <Row style={{borderTop: '1px  solid rgb(200,200,200)', margin: 5}}>
                            <Col md="6" style={{marginRight: -180, marginTop: 10}}>
                                <div
                                    onClick={() => this._goToUserProfile()}>
                                    <UserAvatar style={{color: "white"}}
                                                name={comment.writer.firstName + ' ' + comment.writer.lastName}
                                                size="40"
                                                color="#0174DF"
                                    />
                                </div>
                            </Col>
                            <Col md="6" style={{textAlign: 'left', marginTop: 20}}>
                                <Row
                                    style={{color: "#0174DF", fontWeight: 'bold'}}
                                    onClick={() => this._goToUserProfile()}>
                                    {comment.writer.firstName + ' ' + comment.writer.lastName}
                                </Row>
                            </Col>
                            <Col md="6" className="time" style={{textAlign: 'right', marginLeft: 170, marginTop: -20}}>
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
                                disabled={comment.publish}
                                variant="flat"
                                onClick={() => {
                                    this.onPressPublishComment(comment);
                                }}
                            >
                                <FaCheckCircleO style={{fontSize: 16, marginRight: 5, color: '#42A5F5'}}/>
                                Publier
                            </Button>
                            <Button
                                disabled={!comment.publish}
                                variant="flat"
                                onClick={() => {
                                    this.onPressSendBlockComment(comment);
                                }}
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
                        {childCommentList}
                        {replyBlock}
                    </Row>
                </ListViewItem>
            </div>
        )

    }

    _goToUserProfile() {
        this.props.history.push('/userProfile', {
            ...this.props.comment.writer,
        })

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

    sendReply(id) {

        const childComment = {
            content: this.state.content,
            datetime: moment().valueOf(),
            writer: {
                id: 1,
            },
            eventId: this.props.eventId,
        };
        db.addComment(childComment, id);
        this.setState({
            showReply: false
        })
        window.location.reload();
    }

    formatDate(date) {
        if (!date)
            return [];
        let dateTime = moment(date);
        return dateTime.format(' Do MMMM à HH:MM');

    }

    onPressPublishComment(comment) {
        let newComment = {
            id: comment.id,
            content: comment.content,
            datetime: comment.datetime,
            writer: comment.writer,
            version: comment.version,
            eventId: comment.eventId,
            userId: comment.userId,
            children: comment.children,
            likers: comment.likers,
            publish: true,
        };
        db.updateComment(newComment);
        window.location.reload();
    };

    onPressSendBlockComment(comment) {
        let newComment = {
            id: comment.id,
            content: comment.content,
            datetime: comment.datetime,
            writer: comment.writer,
            version: comment.version,
            eventId: comment.eventId,
            userId: comment.userId,
            children: comment.children,
            likers: comment.likers,
            publish: false,
        };
        db.updateComment(newComment);
        window.location.reload();

    };

    renderChildComments(childrens) {
        let childList = childrens.map(children => {
            let date = this.formatDate(children.datetime);

            return (
                <ChildCommentCard childComment={children} key={children.id}
                                  date={date}/>
            )
                ;
        });
        return (
            <Row style={{paddingLeft: 35}}>
                <ListView aveCellHeight={100}>
                    {childList}
                </ListView>
            </Row>
        )
    }

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
                        style={{backgroundColor: '#42A5F5', color: '#fff'}}
                        onClick={() => {
                            this.sendReply(comment.id)
                        }}
                    >
                        <FaPaperPlane style={{fontSize: 16, marginRight: 5, color: '#fff'}}/>
                        Envoyer
                    </Button>
                </Row>
            </Row>
        )
    }
}