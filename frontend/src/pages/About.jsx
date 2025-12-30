import { assets } from "../assets/assets"
import NewsLetter from "../components/NewsLetter"
import Title from "../components/Title"

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-112.5" src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Velvot Vogue is a contemporary fashion brand dedicated to bringing style, comfort, and quality together. We curate and design clothing that reflects modern trends while maintaining timeless elegance, ensuring every piece feels confident and effortless to wear.</p>
          <p>At Velvot Vogue, we believe fashion is more than just clothing—it’s a form of self-expression. From everyday essentials to standout styles, our collections are crafted with attention to detail, premium fabrics, and a passion for excellence.</p>
          <b className="text-gray-800">Our Mission</b>
          <p>Our mission is to empower individuals to express their unique identity through fashion, offering carefully selected designs that suit every occasion. With a focus on quality, affordability, and customer satisfaction, Velvot Vogue is where style meets sophistication.</p>
        </div>
      </div>

      <div className="text-4xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">At Velvot Vogue, every piece goes through careful quality checks to ensure premium fabrics, precise stitching, and lasting comfort. We are committed to delivering fashion you can trust and feel confident wearing.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">We make shopping effortless with an easy-to-use online store, secure payments, and reliable delivery—so you can enjoy a smooth and hassle-free fashion experience from start to finish.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">At Velvot Vogue, our customers come first. Our dedicated support team is always ready to assist you with quick responses, clear communication, and reliable solutions to ensure a seamless shopping experience.</p>
        </div>
      </div>

      <NewsLetter />
    </div>
  )
}

export default About
