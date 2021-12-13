import { useState } from 'react';
import { Form } from 'react-bootstrap'
import MathJax from "mathjax3-react";
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import "draft-js/dist/Draft.css"
import "draftail/dist/draftail.css"
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from "draftail"


function App() {
  const [qText, setQText] = useState("");

  const initial = JSON.parse(sessionStorage.getItem("draftail:content"))

  const onSave = (content) => {
    console.log("saving", content)
    sessionStorage.setItem("draftail:content", JSON.stringify(content))
  }

  return (
    <div>
      <Container>
        <h1>Testing</h1>
        <Row>
          <Col>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={e => { setQText(e.target.value) }}
              value={qText}
              spellCheck={false}
            />
            <DraftailEditor
              rawContentState={initial || null}
              onSave={onSave}
              blockTypes={[
                { type: BLOCK_TYPE.HEADER_THREE },
                { type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
              ]}
              inlineStyles={[{ type: INLINE_STYLE.BOLD }, { type: INLINE_STYLE.ITALIC }]}
            />

          </Col>
          <Col>
            <MathJax.Provider
              options={{
                tex: {
                  inlineMath: [['$', '$'], ['\\(', '\\)']],
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
