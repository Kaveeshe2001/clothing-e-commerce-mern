import Title from "../../components/Title"

const ProfileDetails = () => {
  return (
    <div>
      <div className="text-2xl pt-5">
        <Title text1={'PROFILE'} text2={'DETAILS'} />
      </div>

      <div className="border border-gray-300 bg-gray-100 pl-5 py-3 mt-6 rounded-sm">
        Name
      </div>
    </div>
  )
}

export default ProfileDetails
