let A = new Vector2d(1,1);
let B = new Vector([1,1,1,1]);

for (let i = 0; i < B.components.length; i++) {
    console.log("B " + i + ":" + B.components[i]);
}

A.mag = 10;
B.mag = 10;


console.log(A);
console.log(B.mag);
for (let i = 0; i < B.components.length; i++) {
    console.log("B " + i + ":" + B.components[i]);
}