import * as yup from 'yup';

const regMatch = /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;


export const JobSchema = yup.object().shape({
  logo: yup.string().url(),
  company: yup.string().required(),
  position: yup.string().required(),
  jobType: yup.string().required(),

  tagList: yup.array()
    .of(
	yup.string()
	  .min(3, 'tags must be 3 charachters or more')
	  .max(10, 'tags must be 10 characters or less')
    )                                                                          
    .min(1, "must add at least one tag")
   .required("tag cannot be empty")
   .test('custom-test', 'tags must be 3 characters or more',
      function (value) {
	if (value && value.length > 0 && value[0].length < 3) {
          return this.createError({
            path: 'tagList',
            message: 'tag must be 3 characters or more',
          });
        }
	return true;
      }
  ),
  location: yup.array()
    .of(
	yup.string()
	  .min(3, 'city name  must be 3 charachters or more')
	  .max(15, 'city name must be 10 characters or less')
    )
    .min(1, "must add at least one city or leave the defaultvalue")
    .required("at least one entry is required")
    .test('custom-test', 'city name must be 3 characters or more',
	function (value) {
	  if (value && value.length > 0 && value[0].length < 3) {
	    return this.createError({
	      path: 'location',
	      message: 'city name must be 3 characters or more',
	    });
	  }
	  return true;
	}
    ),

  logo: yup.mixed().notRequired(),
  bgColorToggle: yup.boolean().default(false),
  bgColorName: yup.string().required(),

  // object with min max validator
  salaryRangeMin: yup.number().required().min(10000),
  salaryRangeMax: yup.number().required().max(1000000).test({
    name: 'maxGreaterThanMin',
    message: 'max salary should be greater than min salary',
    test: (value, context) => {
      return value > context.parent.salaryRangeMin
    },
  }),
  jobDescription: yup.string().required()
	.min(100, 'must add at least 100 charachters')
	.max(10000, "your text shouldnt't excceed 10000 charachters "),
  benefits: yup.lazy((value) =>
    yup.object(
      Object.keys(value || {}).reduce((acc, key) => {
        acc[key] = yup.boolean().required();
        return acc;
      }, {})
    )
  ),
  
  applyDetails: yup.string().required()
    .min(100, 'must add at least 100 charachters')
    .max(10000, "your text shouldnt't excceed 10000 charachters "),
  applyUrl: yup.string().url().required(),
  website: yup.string().required().matches(regMatch, "Website should be a valid URL"),

  jobClass: yup.string().required(),
  priority: yup.string().default('normal'),
  // date validator
  // createdAt: yup.date().transform(function (castValue, originalValue) { return Number.isNaN(originalValue) ? value : new Date(originalValue) }),

  // boolean validator
  verified: yup.boolean().default(false),
  hot: yup.boolean().default(false),

  
});
