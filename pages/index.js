import {MongoClient} from "mongodb";
import Head from "next/head";
// head for 'header' in html
import {Fragment} from "react";
import MeetupList from "../components/meetups/MeetupList";
//SSG(Static site Generated)
const HomePage = (props) => {
  // with all that we can only pass data directly
  //   const [loadMeetup, setLoadMeetup] = useState([]);
  //   useEffect(() => {
  //     // send a http request and fetch data
  //     setLoadMeetup();
  //     // 1) static generation
  //     // this meetup set after the componet was executed
  //     // this mean first time rendering 'loadMeetup' is empty arr
  //     // And nextJS 'only pre-render' the first component render cycle
  //   }, []);
  return (
    <Fragment>
      <Head>
        <title>Real meetups!!!</title>
        <meta
          name="description"
          content="A huge meetups list is generated!!"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};
// export async function getServerSideProps(context) {
//   // get some incoming request or response
//   const req = context.req;
//   const res = context.res;
//   // this function will always run on the server after deployment
//   //which mean regenerate for every coming request
//   return {
//     props: {
//       meetups: DUMMY_MEETUP,
//     },
//   };
// }
// Server-side Rendering(for fetching data)
export async function getStaticProps() {
  // 1) only for pages component
  // 2) call 'getStaticProps' before component fn
  // 3) *Never end up on the client site*
  const client = await MongoClient.connect(
    "mongodb+srv://QueeKao:Aa6413432456@cluster0.lekdx.mongodb.net/QueeKao?retryWrites=true&w=majority"
  );
  const db = client.db();
  const collection = db.collection("meetups");
  const meetups = await collection.find().toArray(); //find all the meetup
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          description: meetup.description,
          key: JSON.stringify(meetup._id),
        };
      }),
    },
    //this 10 mean this page will be regenerate on the server every 10 sec
    // (which mean data never old after 10 sec)
    revalidate: 10, //Number of sec
    //Add Icremental Static Generation
  }; // also return 'obj'
}

export default HomePage;
