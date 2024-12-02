class TreeNode {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}

const arrayToTree = (arr) => {
    if (arr.length === 0) return null;

    let root = new TreeNode(arr[0])
    let index = 1,queue = [root]

    while(queue.length){
        let node = queue.shift()

        if(index < arr.length && arr[index]){
            node.left = new TreeNode(arr[index])
            queue.push(node.left)
        }
        index++

        if(index < arr.length && arr[index]){
            node.right = new TreeNode(arr[index])
            queue.push(node.right)
        }
        index++
    }


    return root
} 


let tree = arrayToTree([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1])

console.log(JSON.stringify(tree))