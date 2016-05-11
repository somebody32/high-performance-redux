// Import React
import React from "react";
import * as Perf from 'react-addons-perf';

// Import Spectacle Core tags
import {
  Deck,
  Heading,
  Slide,
  Spectacle,
  Text,
  Appear,
  BlockQuote,
  Quote,
  Cite,
  Layout,
  Fill,
  Link,
  S,
  Code
} from "spectacle";
import CodeSlide from "spectacle-code-slide";

// Examples
import NaiveList from "../assets/naive_list";
import NaiveListWithSeparateContainers from "../assets/naive_list_2";
import UberFastList from "../assets/naive_list_3";
import SlowWithVizList from "../assets/naive_list_4";
import FastWithVizList from "../assets/naive_list_5";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");

const theme = createTheme({
  primary: "#2C3E50",
  secondary: "#ffcc63",
  tertiary: "#ECF0F1",
  quartenary: "#3498DB"
});

// MWE: will only work on non prod builds
window.perfStart = function() {
  Perf.start();
}

window.perfStop = function() {
  Perf.stop();
  Perf.printInclusive();
  Perf.printWasted();
}

// #E74C3C

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={["fade", "slide"]} transitionDuration={350} progress="bar">
          <Slide>
            <Heading fit textColor="#E74C3C">
              High Performance Redux
            </Heading>
            <Text textSize="1.7em" margin="40px 0px 0px" bold textColor="tertiary">
              Ilya Zayats @somebody32
            </Text>
            <Text textSize="1.2em" margin="40px 0px 0px" bold textColor="#E74C3C">
              Redbooth
            </Text>
          </Slide>

          <Slide>
            <BlockQuote>
              <Quote textColor="secondary" style={{borderLeftColor: "#E74C3C"}}>
                But I've heard React is fast!
              </Quote>
              <Cite textSize="1.5em" style={{textAlign: "right"}}>Everyone</Cite>
            </BlockQuote>
          </Slide>

          <Slide>
            <Heading size={1} fit textColor="secondary">
              This is just a question of scalability
            </Heading>
          </Slide>

          <Slide>
            <Heading size={1} fit textColor="secondary">
              Performance is a feature
            </Heading>
            <Appear>
              <Text textSize="1.7em" margin="40px 0px 0px" bold textColor="tertiary">
                Create your stress project from day one
              </Text>
            </Appear>
          </Slide>

          <Slide>
            <Heading size={1} fit textColor="secondary">
              Our beloved Gantt: 10x project
            </Heading>
            <Appear>
              <Text textSize="1.7em" margin="40px 0px 0px" bold textColor="tertiary">
                A project with 10k tasks and life-span of 10 years
              </Text>
            </Appear>
          </Slide>

          <Slide>
            <Text textSize="2.5em" textColor="secondary" bold>Question:</Text>
            <Text textSize="1.7em" margin="40px 0px 0px" textColor="tertiary" bold lineHeight={1.2}>
              But Redux is only&nbsp;
              <Link textColor="tertiary" href="https://gist.github.com/gaearon/ffd88b0e4f00b22c3159">
                <S type="underline">100 LOC</S>
              </Link>
              . What can be slow there?
            </Text>
          </Slide>

          <Slide>
            <Text textSize="2.5em" textColor="secondary" bold>Answer:</Text>
            <Text textSize="1.7em" margin="40px 0px 0px" textColor="tertiary" bold>
              Nothing! Redux is simple!
            </Text>
            <Appear>
              <Text textSize="1.7em" margin="40px 0px 0px" textColor="tertiary" bold>
                But <Code textColor="secondary">react-redux</Code> is not
              </Text>
            </Appear>
          </Slide>

          <Slide>
            <Heading size={1} textColor="secondary">Redux</Heading>
            <Text textSize="1.7em" margin="40px 0px 0px" textColor="tertiary" bold>
              stores state and notifies about changes
            </Text>
          </Slide>

          <Slide>
            <Heading size={1} textColor="secondary">React-Redux</Heading>
            <Text textSize="1.7em" margin="40px 0px 0px" textColor="tertiary" bold>
              does a lot of ✨ to make everything fast
            </Text>
          </Slide>

          <Slide>
            <Heading size={1} textColor="secondary">ui = 𝑓(state)</Heading>
            <Appear>
              <Text textSize="1.7em" margin="40px 0px 0px" textColor="tertiary" bold>
                how to make this fast?
              </Text>
            </Appear>
            <Appear>
              <Text textSize="1.7em" margin="40px 0px 0px" textColor="tertiary" bold>
                Minimize the amount of calls to
                <Code style={{paddingBottom: "5px", marginLeft: "10px"}} textColor="secondary">𝑓</Code>
              </Text>
            </Appear>
          </Slide>

          <Slide>
            <Code textSize="3.5rem" fit style={{paddingBottom: "5px"}} textColor="secondary">
              shouldComponentUpdate
            </Code>
            <Appear>
              <Text textSize="1.7em" margin="40px 0px 0px" textColor="tertiary" bold>
                And <Code textColor="secondary">react-redux</Code> is doing it for you.
              </Text>
            </Appear>
            <Appear>
              <Text textSize="1.7em" margin="40px 0px 0px" textColor="tertiary" bold>
                Kind of.
              </Text>
            </Appear>
          </Slide>

          <CodeSlide
            maxWidth={1300}
            textSize={"1.8rem"}
            transition={[]}
            lang="js"
            code={require("raw!../assets/connect.example")}
            ranges={[
              { loc: [0, 0], title: "Let's read some code" },
              { loc: [34, 35], note: "Starting from the main export" },
              { loc: [54, 55], note: "Which is a function that returns another function" },
              { loc: [74, 75], note: "and creates a HOC that wraps the passed component" },
              { loc: [74, 75], title: "Phase 1. Initial Render" },
              { loc: [214, 217], note: "On mount we're subscribing to the store" },
              { loc: [200, 204], note: "Which is pretty classic subscribing" },
              { loc: [243, 244], note: "And it is called on updates and immediately after mount" },
              { loc: [248, 250], note: "getting states before and after" },
              { loc: [250, 253], note: "returning if they are identical. Not our case." },
              { loc: [265, 267], note: "So, we're updating the local component's state" },
              { loc: [278, 279], note: "Going into render," },
              { loc: [293, 335], note: "skipping a lot of checks for now," },
              { loc: [345, 350], note: "rendering the wrapped element with merged props," },
              { loc: [352, 353], note: "and finally returning the rendered element" },
              { loc: [74, 75], title: "Phase 2. Update" },
              { loc: [75, 80], note: "HOC implements SCU for us" },
              { loc: [77, 78], note: "Which is `true` if either passed props" },
              { loc: [78, 79], note: "or store were changed" },
              { loc: [278, 281], note: "Let's start with props. Every render call reads the flag" },
              { loc: [298, 304], note: "Checks if state props depend on them" },
              { loc: [304, 307], note: "And the same for dispatch props" },
              { loc: [218, 224], note: "Flag is set on update" },
              { loc: [78, 79], note: "Back to the store updates" },
              { loc: [265, 267], note: "We saw it already inside handleChange call" },
              { loc: [278, 282], note: "This flag is also read on every render" },
              { loc: [298, 301], note: "And also important for recalculation" },
              { loc: [313, 317], note: "Now we can update props out of state" },
              { loc: [317, 321], note: "And also dispatch props" },
              { loc: [323, 327], note: "If something really has changed" },
              { loc: [328, 330], note: "We update mergedProps" },
              { loc: [330, 333], note: "and if not" },
              { loc: [334, 338], note: "return previously rendered element. That forces React to not reconcile" },
              { loc: [345, 350], note: "if yes, update element with new merged props" },
              { loc: [345, 350], title: "Done" }
            ]}
          />

          <Slide>
            <Heading size={2} textColor="secondary">Pretty simple, huh?</Heading>
          </Slide>

          <Slide>
            <Heading size={2} textColor="secondary">Main Idea</Heading>
            <Text textSize="1.5em" margin="40px 0px 0px" textColor="tertiary" bold>
              <Code textColor="secondary">react-redux</Code>&nbsp;
              is fast out-of-the-box
            </Text>
          </Slide>

          <Slide>
            <Heading size={2} textColor="secondary">You can make it even faster</Heading>
            <Appear>
              <Text textSize="1.5em" margin="40px 0px 0px" textColor="tertiary" bold>
                But be sure you're need to
              </Text>
            </Appear>
          </Slide>

          <Slide>
            <Heading size={2} textColor="secondary">Where to start?</Heading>
            <Appear>
              <Text textSize="1.5em" margin="40px 0px 40px" textColor="tertiary" bold>
                Forget Redux. Start optimizing your React code.
              </Text>
            </Appear>
            <Appear>
              <Link textSize="1.5em" textColor="tertiary" href="http://benchling.engineering/deep-dive-react-perf-debugging/">
                <S type="underline">Great guide is available on Benchling Engineering</S>
              </Link>
            </Appear>
          </Slide>

          <Slide>
            <Heading size={2} textColor="secondary">Examples time!</Heading>
            <Appear>
              <Text textSize="1.5em" margin="40px 0px 40px" textColor="tertiary" bold>
                Be patient, they are slow to render
              </Text>
            </Appear>
          </Slide>

          <Slide>
            <Heading textColor="secondary">
              Naïve 10k list
            </Heading>
            <Text margin="4px 0px 20px" bold textColor="tertiary">
              Start measurements, click rows, open browser console, stop measurements, scream 😱.
            </Text>
            <button style={{margin: "0px 10px 20px", color: "#3498DB"}} onClick={perfStart}>Start Perf Measurement</button>
            <button style={{margin: "0px 10px 20px", color: "#3498DB"}} onClick={perfStop}>Stop Perf Measurement</button>
            <NaiveList />
          </Slide>

          <CodeSlide
            maxWidth={1300}
            textSize={"1.8rem"}
            transition={[]}
            lang="js"
            code={require("raw!../assets/naive_list/code.example")}
            ranges={[
              { loc: [0, 0], title: "Naïve code" },
              { loc: [0, 12], note: "Classic reducer" },
              { loc: [13, 25], note: "Plain container" },
              { loc: [26, 36], note: "Super simple" }
            ]}
          />

          <Slide>
            <Heading textColor="secondary">
              Less Naïve 10k list
            </Heading>
            <Text margin="4px 0px 20px" bold textColor="tertiary">
              Scream 😱 less, clicking should be faster.
            </Text>
            <button style={{margin: "0px 10px 20px", color: "#3498DB"}} onClick={perfStart}>Start Perf Measurement</button>
            <button style={{margin: "0px 10px 20px", color: "#3498DB"}} onClick={perfStop}>Stop Perf Measurement</button>
            <NaiveListWithSeparateContainers />
          </Slide>

          <CodeSlide
            maxWidth={1300}
            textSize={"1.8rem"}
            transition={[]}
            lang="js"
            code={require("raw!../assets/naive_list_2/code.example")}
            ranges={[
              { loc: [0, 0], title: "More components" },
              { loc: [0, 8], note: "Splitting reducer" },
              { loc: [9, 12], note: "Ids array" },
              { loc: [13, 26], note: "Items object by ids" },
              { loc: [27, 41], note: "App could be stateless now" },
              { loc: [41, 45], note: "Just listening to ids" },
              { loc: [45, 53], note: "Each item listens to itself" },
              { loc: [53, 58], note: "Smart component" }
            ]}
          />

          <Slide>
            <Heading textColor="secondary">
              Uber fast 10k list
            </Heading>
            <Text margin="4px 0px 20px" bold textColor="tertiary">
              Scream 😱 a lot, but because of speed!
            </Text>
            <button style={{margin: "0px 10px 20px", color: "#3498DB"}} onClick={perfStart}>Start Perf Measurement</button>
            <button style={{margin: "0px 10px 20px", color: "#3498DB"}} onClick={perfStop}>Stop Perf Measurement</button>
            <UberFastList />
          </Slide>

          <CodeSlide
            maxWidth={1300}
            textSize={"1.8rem"}
            transition={[]}
            lang="js"
            code={require("raw!../assets/naive_list_3/code.example")}
            ranges={[
              { loc: [0, 0], title: "Fabric functions!" },
              { loc: [0, 9], note: "Function that returns functions" },
            ]}
          />

          <CodeSlide
            maxWidth={1300}
            textSize={"1.8rem"}
            transition={[]}
            lang="js"
            code={require("raw!../assets/connect2.example")}
            ranges={[
              { loc: [0, 0], title: "Back to react-redux" },
              { loc: [243, 244], note: "Our familiar handleChange" },
              { loc: [254, 263], note: "Short-circuiting the check. React will not even try to update" },
            ]}
          />

          <Slide>
            <Heading textColor="secondary">
              Slow list with rendering vizualization
            </Heading>
            <SlowWithVizList />
          </Slide>

          <Slide>
            <Heading textColor="secondary">
              Fast list with rendering vizualization
            </Heading>
            <FastWithVizList />
          </Slide>

          <Slide>
            <Heading textColor="secondary">
              What about reselect?
            </Heading>
            <Appear>
              <Text textSize="1.5em" margin="40px 0px 40px" textColor="tertiary" bold>
                Measure, then move all derived data there: counters, filters, etc.
              </Text>
            </Appear>
          </Slide>

          <Slide>
            <Heading textColor="secondary">
              Remember!
            </Heading>
            <Appear>
              <Text textSize="1.5em" margin="40px 0px 40px" textColor="tertiary" bold lineHeight={1.2}>
                <Code textColor="secondary">mapStateToProps</Code> is the new <Code textColor="secondary">render</Code>.
                Called on every store update.
              </Text>
            </Appear>
          </Slide>

          <Slide>
            <Heading textColor="secondary">
              Split Stores
            </Heading>
            <Text textSize="1.5em" margin="40px 0px 40px" textColor="tertiary" bold>
              If you're doing something strange in some part of your app.
            </Text>
            <Appear>
              <Text textSize="1.5em" margin="40px 0px 40px" textColor="tertiary" bold>
                I haven't tried that, just remember that this is possible.
              </Text>
            </Appear>
          </Slide>

          <Slide>
            <Heading textColor="secondary">
              What to do with slow initial renders?
            </Heading>
            <Text textSize="1.5em" margin="40px 0px 40px" textColor="tertiary" bold>
              Limit things that you're rendering. Users are not going to see everything without scrolling.
            </Text>
            <Appear>
              <Text textSize="1.5em" margin="40px 0px 40px" textColor="tertiary" bold>
                <Link textColor="tertiary" href="https://github.com/bvaughn/react-virtualized">
                  <S type="underline">react-virtualized</S>
                </Link>
              </Text>
            </Appear>
          </Slide>

          <Slide>
            <Heading textColor="#E74C3C">
              Thanks!
            </Heading>
            <Text textSize="1.5em" margin="40px 0px 40px" textColor="tertiary" bold>
              Ilya Zayats
            </Text>
            <Text textSize="1.5em" margin="40px 0px 40px" textColor="secondary" bold>
              @somebody32
            </Text>
          </Slide>
        </Deck>
      </Spectacle>
    );
  }
}
