import React, {Component} from 'react';
import {ListViewItem}  from 'react-scrollable-list-view';
import FaClockO from 'react-icons/lib/fa/clock-o';
import {Button, Col, Row, Textarea}  from 'muicss/react';
import {FaEdit} from "react-icons/lib/fa/index";
import FaCheckCircleO from 'react-icons/lib/fa/check-circle-o';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import db from "../utils/db";
export default class ChildCommentCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',

        };
    }

    render() {
        const {childComment, date} = this.props;
        const disable = childComment.writer.id == 1 ? false : true;
        const renderActionComment = childComment.writer.id == 1 ?
            (
                <Row>
                    <Col md="6" style={{textAlign: 'left'}}>
                        <Button color="danger" variant="flat" style={{fontSize: 10}}
                                onClick={() => {
                                    this.deleteComment(childComment.id)
                                }}
                        >Supprimer le commentaire</Button>
                    </Col>
                    <Col md="6" style={{textAlign: 'right'}}>
                        <Button color="primary" style={{fontSize: 10}} onClick={() => {
                            this.updateComment(childComment)
                        }}
                        ><FaEdit /> Modifier</Button>
                    </Col>

                </Row>
            ) :
            (<Row>
                <Button
                    disabled={childComment.publish}
                    variant="flat"
                    style={{fontSize: 12}}
                    onClick={() => {
                        this.onPressPublishComment(childComment);
                    }}
                >
                    <FaCheckCircleO style={{fontSize: 12, marginRight: 5, color: '#42A5F5'}}/>
                    Publier
                </Button>
                <Button
                    disabled={!childComment.publish}
                    variant="flat"
                    style={{fontSize: 12}}
                    onClick={() => {
                        this.onPressSendBlockComment(childComment);
                    }}
                >
                    <FaTimesCircle style={{fontSize: 12, marginRight: 5, color: '#B71C1C'}}/>
                    Bloquer
                </Button>
              </Row>)
        ;
        return (
            <div>
                <ListViewItem height={100} key={childComment.id}>
                    <Row >
                        <Row style={{borderBottom: '1px  solid rgb(200,200,200)'}}>
                            <Col md="6" style={{textAlign: 'left'}}>
                                <Row style={{
                                    color: 'darkred',
                                    fontWeight: 'bold'
                                }}>{childComment.writer.firstName}</Row>
                            </Col>
                            <Col md="6" className="time" style={{marginTop: 8, textAlign: 'right'}}>
                                <FaClockO style={{fontSize: 16}}/> {date}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <textarea defaultValue={childComment.content} disabled={disable}
                                          style={{width: '100%', marginTop: 12, color: '#0D47A1'}} rows={2}
                                          onChange={this.setContent}/>
                            </Col>
                        </Row>
                        {renderActionComment}
                    </Row>
                </ListViewItem>
            </div>
        )

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

    setContent = (event) => {
        let inputValue = event.target.value;
        this.setState({
            content: inputValue
        })
    }

    updateComment(comment) {
        const newComment = {
            id: comment.id,
            version: comment.version,
            content: this.state.content,
            datetime: comment.datetime,
            eventId: comment.eventId,
            writer: comment.writer,
            childComments: comment.children,
            likers: comment.likers,
            nbLike: comment.nbLike
        }
        db.updateComment(newComment);
        window.location.reload();
    }

    deleteComment(id) {
        db.deleteComment(id);
        window.location.reload();
    }


}