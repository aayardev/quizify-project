import factory


class QuestionFactory(factory.DictFactory):
    id = factory.Faker("random_int")
    question = factory.Faker("text")
    answer = factory.Faker("text")
    option1 = factory.Faker("text")
    option2 = factory.Faker("text")
    option3 = factory.Faker("text")
