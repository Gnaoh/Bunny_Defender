<script language="JavaScript">
<!--
var employerName=prompt("Enter Your Name, Please.");
var today = new Date ()
var hrs = today.getHours();
document.writeln("<b>");
document.writeln("<b>");
if (hrs <= 12)
	document.write("Good Morning "+employerName+'!');
else if (hrs <= 18)
	document.write("Good Afternoon "+employerName+'!');
else
	document.write("Good Evening "+employerName+'!'); document.writeln("<br />");
// -->
</script>


def bubble_sort(array)
  n = array.length
  loop do
    swapped = false
    (n-1).times do |i|
      if array[i] > array[i+1]
        array[i], array[i+1] = array[i+1], array[i]
        swapped = true
      end
    end
    break if not swapped
  end
  array
end

def mergesort(array)
  def merge(left_sorted, right_sorted)
    res = []
    l = 0
    r = 0
    loop do
      break if r >= right_sorted.length and l >= left_sorted.length
      if r >= right_sorted.length or (l < left_sorted.length and left_sorted[l] < right_sorted[r])
        res << left_sorted[l]
        l += 1
      else
        res << right_sorted[r]
        r += 1
      end
    end
    return res
  end

  def mergesort_iter(array_sliced)
    return array_sliced if array_sliced.length <= 1
    mid = array_sliced.length/2 - 1
    left_sorted = mergesort_iter(array_sliced[0..mid])
    right_sorted = mergesort_iter(array_sliced[mid+1..-1])
    return merge(left_sorted, right_sorted)
  end
  
  mergesort_iter(array)
end