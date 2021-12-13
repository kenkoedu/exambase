import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap'
import MathJax from "mathjax3-react";
import { Container, Row, Col } from 'react-bootstrap';
import axios from "axios"
import './App.css';
import "draft-js/dist/Draft.css"
import "draftail/dist/draftail.css"

const subjectSelect = [
  'DSE-MATH-CP',
  'DSE-MATH-M1',
  'DSE-MATH-M2',
  'CE-MATH',
  'CE-AMATH',
  'AL-PUREMATH',
  'AL-APPMATH'
]

const baseurl = 'app/data-xpbct/endpoint/data/beta'
const apikey = 'rmOvYnSE3eKGobExYiYEOKMiQEGoa5pl9E3e3ECzyipcAtLOP1RQROf3AjGpzGbP'

function App() {
  const [qText, setQText] = useState("");
  const instance = axios.create({
    baseURL: baseurl,
    headers: {
      'Content-Type': 'application/json',
      'api-key': apikey
    }
  })
  const [topics, setTopics] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const a = await instance.post('action/find', {
        dataSource: "Cluster0",
        database: "exambase",
        collection: "topics"
      })
      setTopics(a.data.documents)
    };
    fetchData()
  })

  return (
    <div>
      <Container>
        <h1>Testing</h1>
        <Row>
          <Col>
            <Form>
              <Form.Group className="mb-3" controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Select size="lg">
                  {subjectSelect.map(subject => {
                    return (<option>{subject}</option>)
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formYear">
                <Form.Label>Year</Form.Label>
                <Form.Control type="number" size="lg" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formQNumber">
                <Form.Label>Question Number</Form.Label>
                <Form.Control type="number" size="lg" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formTopic">
                <Form.Label>Topic</Form.Label>
                <Form.Select size="lg">
                  {topics?.map(topic => {
                    return (<option value={topic._id}>{topic.publisher}-{topic.chapterCode}-{topic.topicE}-{topic.topicC}</option>)
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formQuestion">
                <Form.Label>Quesiton</Form.Label>
                <Form.Control
                  as="textarea"
                  size="lg"
                  rows={3}
                  onChange={e => { setQText(e.target.value) }}
                  value={qText}
                  spellCheck={false}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <MathJax.Provider
              options={{
                tex: {
                  inlineMath: [['\\(', '\\)']],
                  processEscapes: true
                }
              }}
            >
              <MathJax.Html html={qText} />
            </MathJax.Provider>
          </Col>
        </Row>
      </Container>
    </div >
  );
}

export default App;
