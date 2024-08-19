import * as yup from 'yup';

export const JobSchema = yup.object().shape({
  company: yup.string().required(),
  position: yup.string().required(),
  jobClass: yup.string().required(),
  location: yup.string().required(),
  website: yup.string().url().required(),
  applyUrl: yup.string().url().required(),
  jobType: yup.string().required(),
  priority: yup.string().required().default('normal'),
  // date validator
  createdAt: yup.date().transform(function (castValue, originalValue) {
    return Number.isNaN(originalValue) ? value : new Date(originalValue)
  }),
  // boolean validator
  verified: yup.boolean().default(false),
  hot: yup.boolean().default(false),

  // object with min max validator
  salaryRangeMin: yup.number().required().min(5),
  salaryRangeMax: yup.number().required().max(500).test({
    name: 'maxGreaterThanMin',
    message: 'max should be always greater than min',
    test: (value, context) => {
      return value > context.parent.salaryRangeMin
    },
  }),

  // array of strings validator
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
      }),
});
