import {MongoClient, ObjectId} from "mongodb";
import {Fragment} from "react";
import Head from "next/head";
import MeetupDetails from "../../components/meetups/MeetupDetails";
function MeetupDetail(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}></meta>
      </Head>
      <MeetupDetails
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
        id={props.meetupData.id}
      />
    </Fragment>
  );
}
export async function getStaticPaths() {
  //nextjs need to know which ID values it should pre-generate the pages
  const client = await MongoClient.connect(
    "mongodb+srv://QueeKao:Aa6413432456@cluster0.lekdx.mongodb.net/QueeKao?retryWrites=true&w=majority"
  );
  const db = client.db();
  const collection = db.collection("meetups");
  const meetups = await collection.find({}, {_id: 1}).toArray();
  //first empty 'obj' find all the obj
  //sencond argument define which field we wanna extract
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {meetupId: JSON.stringify(meetup._id)},
    })),

    // this 'false' here will say the 'path' contain all the meetup ID value
    // and 'true' nextjs will generate for meetup ID dynamically on the server
  };
}
export async function getStaticProps(context) {
  // not able to 'useRouter' here
  //fetch data for a single meetup
  const meetupId = context.params.meetupId;
  console.log(meetupId); //this will log in 'node'
  const client = await MongoClient.connect(
    "mongodb+srv://QueeKao:Aa6413432456@cluster0.lekdx.mongodb.net/QueeKao?retryWrites=true&w=majority"
  );
  const db = client.db();
  const collection = db.collection("meetups");
  const selectedMeetup = await collection.findOne({
    _id: ObjectId(meetupId.slice(1, -1)),
  });
  // findOne 'obj' which contain this unique meetupId
  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
export default MeetupDetail;
