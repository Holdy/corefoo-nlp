In general, the intent-tree contains two types of nodes:
* Structure Nodes - Who, On, In
* Content Nodes - Bob, Wednesday, London

Generally, when a sentence is modelled as a tree, structure and content alternate.
```
   Content: "I"
      Structure: "saw"
         Content: "Bob"
            Structure: "on"
               Content: "Wednesday"
```

A quick thought on ambigus sentence - which turn out to be good modelling examples.

We might look at the sentence:
> I saw a man on a hill with a telescope.

You might be surprised to learn that there are four reasonable interpretations of this sentence - and at least one unreasonable one. We could say, a computer can't deal with ambiguity. But, its ambigous for everyone - not just a computer. In this case, an NLP system should detect the ambiguity and seek clarification - just as we would.

The five, variations would be modelled as:

1. There’s a man on a hill, and I’m watching him with a telescope.
```
   C: "I"
      S: "saw" (with my eyes)
         C: "a man"
            S: "on"
               C: "a hill"
         S: "with"
            C: "a telescope"
```
The 'seeing' is being done with a telescope, so "with a telescope" is below "saw".

2. There’s a man on a hill, who I’m seeing, and he has a telescope.
```
   C: "I"
      S: "saw" (with my eyes)
         C: "a man"
            S: "on"
               C: "a hill"
            S: "with"
               C: "a telescope"
```
Now the man has the telescope, so "with a telescope" is below "a man".

3. There’s a man, and he’s on a hill that also has a telescope on it.
```
   C: "I"
      S: "saw" (with my eyes)
         C: "a man"
            S: "on"
               C: "a hill"
                  S: "with"
                     C: "a telescope"
```
Now the hill has a telescope, so it sits below "a hill"

4. I’m on a hill, and I saw a man using a telescope.
```
   C: "I"
      S: "on"
         C: "a hill"
      S: "saw" (with my eyes - guessed where this is going yet?)
         C: "a man"
            S: "with"
               C: "a telescope"
```
The phrase "on a hill" now belongs to "I". It could, arguably belong to "saw" if it was key that the 'seeing' was done on the hill.

5. There’s a man on a hill, and I’m sawing him with a telescope.
```
   C: "I"
      S: "saw" (as if to cut in half)
         S: "with"
            C: "a telescope"
         C: "a man"
            S: "on"
               C: "a hill"
```
This is the same structure as 1. but now the man is in danger! The difference would be in the semantic meaning given to the verb "saw".


